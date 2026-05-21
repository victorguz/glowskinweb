export const ASSETS_CDN = "https://main.dlloltrpvu8dp.amplifyapp.com/assets";
export const LANDINGS_CDN = `${ASSETS_CDN}/landings`;
export const IMAGES_CDN = `${ASSETS_CDN}/images`;

export function landingAsset(path: string) {
  return `${LANDINGS_CDN}/${path}`;
}

export function imageAsset(path: string) {
  return `${IMAGES_CDN}/${path}`;
}
