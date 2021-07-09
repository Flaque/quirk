import { Asset } from "expo-asset";

export function cacheImages(images) {
  return images.map(image => {
    return Asset.fromModule(image).downloadAsync();
  });
}

export default async function loadImages(images: Array<any>) {
  const imageAssets = cacheImages(images);
  await Promise.all([...imageAssets]);

  return images.map(img => {
    return Asset.fromModule(img).localUri;
  });
}
