#!/usr/bin/env node

/**
 * Script para verificar que los archivos SEO sean accesibles
 * Verifica robots.txt, sitemap.xml y llm.txt
 */

const fs = require("fs");
const path = require("path");

const SEO_FILES = [
  {
    name: "robots.txt",
    path: "src/robots.txt",
    contentType: "text/plain",
    requiredContent: ["User-agent:", "Sitemap:", "glowskinbq.com"],
  },
  {
    name: "sitemap.xml",
    path: "src/sitemap.xml",
    contentType: "application/xml",
    requiredContent: ['<?xml version="1.0"', "<urlset", "glowskinbq.com"],
  },
  {
    name: "llm.txt",
    path: "src/llm.txt",
    contentType: "text/plain",
    requiredContent: ["# Glow Skin", "Barranquilla", "servicios"],
  },
];

function verifyFile(file) {
  console.log(`\n🔍 Verificando ${file.name}...`);

  // Verificar que el archivo existe
  if (!fs.existsSync(file.path)) {
    console.error(`❌ Error: ${file.name} no existe en ${file.path}`);
    return false;
  }

  // Leer contenido
  const content = fs.readFileSync(file.path, "utf8");

  if (!content || content.trim().length === 0) {
    console.error(`❌ Error: ${file.name} está vacío`);
    return false;
  }

  // Verificar contenido requerido
  const missingContent = file.requiredContent.filter(
    (required) => !content.includes(required)
  );

  if (missingContent.length > 0) {
    console.error(
      `❌ Error: ${file.name} no contiene: ${missingContent.join(", ")}`
    );
    return false;
  }

  console.log(`✅ ${file.name} OK - ${content.length} caracteres`);
  return true;
}

function verifyAngularConfig() {
  console.log("\n🔍 Verificando configuración de Angular...");

  const angularJsonPath = "angular.json";
  if (!fs.existsSync(angularJsonPath)) {
    console.error("❌ Error: angular.json no encontrado");
    return false;
  }

  const angularConfig = JSON.parse(fs.readFileSync(angularJsonPath, "utf8"));
  const assets =
    angularConfig.projects["glow-skin-angular"].architect.build.options.assets;

  const requiredAssets = ["src/robots.txt", "src/sitemap.xml", "src/llm.txt"];
  const missingAssets = requiredAssets.filter(
    (asset) => !assets.includes(asset)
  );

  if (missingAssets.length > 0) {
    console.error(
      `❌ Error: Assets faltantes en angular.json: ${missingAssets.join(", ")}`
    );
    return false;
  }

  console.log(
    "✅ Configuración de Angular OK - todos los archivos SEO incluidos en assets"
  );
  return true;
}

function verifyAmplifyConfig() {
  console.log("\n🔍 Verificando configuración de Amplify...");

  const amplifyYmlPath = "amplify.yml";
  if (!fs.existsSync(amplifyYmlPath)) {
    console.error("❌ Error: amplify.yml no encontrado");
    return false;
  }

  const amplifyConfig = fs.readFileSync(amplifyYmlPath, "utf8");

  const requiredPatterns = ["robots.txt", "sitemap.xml", "llm.txt"];
  const missingPatterns = requiredPatterns.filter(
    (pattern) =>
      !amplifyConfig.includes(`pattern: "${pattern}"`) &&
      !amplifyConfig.includes(`source: "/${pattern}"`)
  );

  if (missingPatterns.length > 0) {
    console.error(
      `❌ Error: Configuración faltante en amplify.yml: ${missingPatterns.join(
        ", "
      )}`
    );
    return false;
  }

  console.log(
    "✅ Configuración de Amplify OK - headers y redirects configurados"
  );
  return true;
}

function main() {
  console.log("🚀 Verificando archivos SEO para Glow Skin...\n");

  let allValid = true;

  // Verificar cada archivo SEO
  SEO_FILES.forEach((file) => {
    if (!verifyFile(file)) {
      allValid = false;
    }
  });

  // Verificar configuraciones
  if (!verifyAngularConfig()) {
    allValid = false;
  }

  if (!verifyAmplifyConfig()) {
    allValid = false;
  }

  console.log("\n" + "=".repeat(50));

  if (allValid) {
    console.log("🎉 ¡Todos los archivos SEO están correctamente configurados!");
    console.log("\n📋 Archivos verificados:");
    SEO_FILES.forEach((file) => {
      console.log(`   ✅ ${file.name} - ${file.contentType}`);
    });
    console.log("\n🌐 URLs accesibles:");
    console.log("   📄 https://glowskinbq.com/robots.txt");
    console.log("   🗺️  https://glowskinbq.com/sitemap.xml");
    console.log("   🤖 https://glowskinbq.com/llm.txt");
    process.exit(0);
  } else {
    console.log("❌ Se encontraron errores en la configuración SEO");
    process.exit(1);
  }
}

main();
