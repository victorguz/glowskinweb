"use client";

/**
 * Almacenamiento "seguro" en el navegador para datos de identidad usados en
 * Meta CAPI (email, teléfono, external_id).
 *
 * IMPORTANTE (limitación conocida): esto cifra los valores en reposo con
 * AES-GCM (Web Crypto), pero la clave de cifrado también vive en el propio
 * navegador (localStorage). Esto protege contra inspección casual del
 * localStorage (DevTools, extensiones, backups), pero NO es una defensa
 * fuerte contra un atacante que ya puede ejecutar JavaScript en el sitio
 * (XSS), ya que ese atacante también podría leer la clave. Aun así, es una
 * mejora sobre guardar el valor en texto plano o solo hasheado.
 */

const KEY_STORAGE_KEY = "gs_sk";
const IDENTITY_STORAGE_KEY = "gs_identity_v1";
const IDENTITY_TTL_MS = 180 * 24 * 60 * 60 * 1000; // 180 días

export interface StoredIdentity {
  email?: string;
  phone?: string;
  externalId?: string;
}

interface StoredIdentityEnvelope {
  savedAt: number;
  payload: StoredIdentity;
}

function hasWindow(): boolean {
  return typeof window !== "undefined" && typeof window.crypto !== "undefined";
}

function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function getOrCreateCryptoKey(): Promise<CryptoKey | undefined> {
  if (!hasWindow()) return undefined;

  try {
    const existing = window.localStorage.getItem(KEY_STORAGE_KEY);
    if (existing) {
      const rawKey = base64ToBuffer(existing);
      return await window.crypto.subtle.importKey(
        "raw",
        rawKey,
        { name: "AES-GCM" },
        true,
        ["encrypt", "decrypt"],
      );
    }

    const key = await window.crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"],
    );
    const exported = await window.crypto.subtle.exportKey("raw", key);
    window.localStorage.setItem(KEY_STORAGE_KEY, bufferToBase64(exported));
    return key;
  } catch (error) {
    console.warn("[secureStorage] No se pudo obtener la clave de cifrado", error);
    return undefined;
  }
}

async function encryptString(plainText: string): Promise<string | undefined> {
  if (!hasWindow()) return undefined;
  const key = await getOrCreateCryptoKey();
  if (!key) return undefined;

  try {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(plainText);
    const cipherBuffer = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoded,
    );
    return `${bufferToBase64(iv)}.${bufferToBase64(cipherBuffer)}`;
  } catch (error) {
    console.warn("[secureStorage] Error al cifrar", error);
    return undefined;
  }
}

async function decryptString(cipherText: string): Promise<string | undefined> {
  if (!hasWindow()) return undefined;
  const key = await getOrCreateCryptoKey();
  if (!key) return undefined;

  try {
    const [ivB64, dataB64] = cipherText.split(".");
    if (!ivB64 || !dataB64) return undefined;
    const iv = base64ToBuffer(ivB64);
    const data = base64ToBuffer(dataB64);
    const plainBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data,
    );
    return new TextDecoder().decode(plainBuffer);
  } catch (error) {
    console.warn("[secureStorage] Error al descifrar", error);
    return undefined;
  }
}

/**
 * Lee la identidad persistida (email/phone/externalId). Si está corrupta,
 * vencida o no se puede descifrar, retorna `{}` y limpia el storage.
 */
export async function getIdentity(): Promise<StoredIdentity> {
  if (!hasWindow()) return {};

  try {
    const raw = window.localStorage.getItem(IDENTITY_STORAGE_KEY);
    if (!raw) return {};

    const decrypted = await decryptString(raw);
    if (!decrypted) {
      window.localStorage.removeItem(IDENTITY_STORAGE_KEY);
      return {};
    }

    const envelope: StoredIdentityEnvelope = JSON.parse(decrypted);
    if (
      !envelope ||
      typeof envelope.savedAt !== "number" ||
      Date.now() - envelope.savedAt > IDENTITY_TTL_MS
    ) {
      window.localStorage.removeItem(IDENTITY_STORAGE_KEY);
      return {};
    }

    return envelope.payload ?? {};
  } catch (error) {
    console.warn("[secureStorage] No se pudo leer la identidad guardada", error);
    window.localStorage.removeItem(IDENTITY_STORAGE_KEY);
    return {};
  }
}

/**
 * Combina y persiste la identidad (email/phone/externalId), cifrada.
 * Los campos no provistos conservan el valor ya almacenado.
 */
export async function setIdentity(partial: StoredIdentity): Promise<void> {
  if (!hasWindow()) return;

  try {
    const current = await getIdentity();
    const merged: StoredIdentity = {
      email: partial.email?.trim() || current.email,
      phone: partial.phone?.trim() || current.phone,
      externalId: partial.externalId || current.externalId,
    };

    const envelope: StoredIdentityEnvelope = {
      savedAt: Date.now(),
      payload: merged,
    };

    const encrypted = await encryptString(JSON.stringify(envelope));
    if (!encrypted) return;

    window.localStorage.setItem(IDENTITY_STORAGE_KEY, encrypted);
  } catch (error) {
    console.warn("[secureStorage] No se pudo guardar la identidad", error);
  }
}

/**
 * Retorna el external_id anónimo (UUID) del visitante, generándolo y
 * persistiéndolo si aún no existe. No contiene información personal.
 */
export async function getOrCreateExternalId(): Promise<string | undefined> {
  if (!hasWindow()) return undefined;

  const current = await getIdentity();
  if (current.externalId) return current.externalId;

  const externalId =
    typeof window.crypto.randomUUID === "function"
      ? window.crypto.randomUUID()
      : bufferToBase64(window.crypto.getRandomValues(new Uint8Array(16)));

  await setIdentity({ externalId });
  return externalId;
}
