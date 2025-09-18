/**
 * Cloudinary Proxy for Contentful Images
 * Fetches images from Contentful and transforms them via Cloudinary
 * without storing on Cloudinary servers
 */

interface TransformOptions {
  width?: number;
  height?: number;
  aspectRatio?: string;
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | 'auto:low' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'pad' | 'thumb';
  gravity?: 'auto' | 'face' | 'faces' | 'center' | 'north' | 'south';
  blur?: number;
  dpr?: 'auto' | number;
  fetchFormat?: 'auto';
}

const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkvj1ssup';

/**
 * Get Cloudinary proxy URL for Contentful image
 * Uses fetch transformation to proxy Contentful images through Cloudinary
 */
export function getCloudinaryProxy(contentfulUrl: string, options: TransformOptions = {}): string {
  if (!contentfulUrl) return '';

  // Extract clean URL from Contentful
  const cleanUrl = contentfulUrl.startsWith('//')
    ? `https:${contentfulUrl}`
    : contentfulUrl.startsWith('http')
      ? contentfulUrl
      : `https:${contentfulUrl}`;

  // Default optimizations
  const defaults: TransformOptions = {
    quality: 'auto',
    format: 'auto',
    fetchFormat: 'auto',
    dpr: 'auto',
    ...options
  };

  // Build transformation string
  const transformations: string[] = [];

  if (defaults.width) transformations.push(`w_${defaults.width}`);
  if (defaults.height) transformations.push(`h_${defaults.height}`);
  if (defaults.aspectRatio) transformations.push(`ar_${defaults.aspectRatio}`);
  if (defaults.quality) transformations.push(`q_${defaults.quality}`);
  if (defaults.format) transformations.push(`f_${defaults.format}`);
  if (defaults.fetchFormat) transformations.push(`fl_${defaults.fetchFormat}`);
  if (defaults.crop) transformations.push(`c_${defaults.crop}`);
  if (defaults.gravity) transformations.push(`g_${defaults.gravity}`);
  if (defaults.blur && defaults.blur > 0) transformations.push(`e_blur:${defaults.blur}`);
  if (defaults.dpr) transformations.push(`dpr_${defaults.dpr}`);

  // Add performance flags
  transformations.push('fl_progressive');
  transformations.push('fl_immutable_cache');

  const transformation = transformations.join(',');

  // Encode the Contentful URL for proxy
  const encodedUrl = encodeURIComponent(cleanUrl);

  // Return Cloudinary fetch URL
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${transformation}/${encodedUrl}`;
}

/**
 * Generate responsive image set from Contentful URL
 */
export function getResponsiveImageSet(
  contentfulUrl: string,
  sizes: number[] = [400, 800, 1200],
  options: TransformOptions = {}
) {
  return {
    src: getCloudinaryProxy(contentfulUrl, { width: sizes[1], ...options }),
    srcset: sizes
      .map(size => `${getCloudinaryProxy(contentfulUrl, { width: size, ...options })} ${size}w`)
      .join(', '),
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
  };
}

/**
 * Get optimized project card image
 */
export function getProjectImage(contentfulUrl: string) {
  return getCloudinaryProxy(contentfulUrl, {
    width: 800,
    height: 600,
    aspectRatio: '4:3',
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto:good'
  });
}

/**
 * Get optimized hero/header image
 */
export function getHeroImage(contentfulUrl: string) {
  return getCloudinaryProxy(contentfulUrl, {
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    crop: 'fill',
    gravity: 'faces',
    quality: 'auto:best'
  });
}

/**
 * Get avatar/profile image
 */
export function getAvatarImage(contentfulUrl: string, size: number = 200) {
  return getCloudinaryProxy(contentfulUrl, {
    width: size,
    height: size,
    aspectRatio: '1:1',
    crop: 'thumb',
    gravity: 'face',
    quality: 'auto:good'
  });
}

/**
 * Get blurred placeholder for lazy loading
 */
export function getPlaceholderImage(contentfulUrl: string) {
  return getCloudinaryProxy(contentfulUrl, {
    width: 20,
    quality: 10,
    blur: 1000,
    format: 'webp'
  });
}