export const ASSETS_CDN =
  process.env.NEXT_PUBLIC_ASSETS_CDN ??
  "https://d2dlpa102or2ci.cloudfront.net";
export const LANDINGS_CDN = `${ASSETS_CDN}/landings`;
export const IMAGES_CDN = `${ASSETS_CDN}/images`;

export function landingAsset(path: string) {
  return `${LANDINGS_CDN}/${path}`;
}

export function imageAsset(path: string) {
  return `${IMAGES_CDN}/${path}`;
}
