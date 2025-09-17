interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: 'auto' | 'auto:best' | 'auto:eco' | 'auto:good' | 'auto:low' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'pad' | 'thumb';
  gravity?: 'auto' | 'face' | 'faces' | 'center';
  effect?: string;
  blur?: number;
}

const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

export function getOptimizedImageUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  const defaultOptions: CloudinaryOptions = {
    quality: 'auto:best',
    format: 'auto',
    crop: 'fill',
    gravity: 'auto',
    ...options
  };

  const transformations: string[] = [];

  if (defaultOptions.width) transformations.push(`w_${defaultOptions.width}`);
  if (defaultOptions.height) transformations.push(`h_${defaultOptions.height}`);
  if (defaultOptions.quality) transformations.push(`q_${defaultOptions.quality}`);
  if (defaultOptions.format) transformations.push(`f_${defaultOptions.format}`);
  if (defaultOptions.crop) transformations.push(`c_${defaultOptions.crop}`);
  if (defaultOptions.gravity) transformations.push(`g_${defaultOptions.gravity}`);
  if (defaultOptions.effect) transformations.push(`e_${defaultOptions.effect}`);
  if (defaultOptions.blur) transformations.push(`e_blur:${defaultOptions.blur}`);

  transformations.push('dpr_auto', 'f_auto');

  const transformation = transformations.join(',');
  return `${BASE_URL}/${transformation}/${publicId}`;
}

export function getResponsiveImageSet(publicId: string, baseWidth: number = 400) {
  const widths = [baseWidth, baseWidth * 1.5, baseWidth * 2];
  return widths.map(width => ({
    src: getOptimizedImageUrl(publicId, { width }),
    width
  }));
}

export function getBlurredPlaceholder(publicId: string) {
  return getOptimizedImageUrl(publicId, {
    width: 20,
    quality: 10,
    blur: 1000,
    format: 'webp'
  });
}