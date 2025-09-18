import { createClient } from 'contentful';
import type { Entry, Asset } from 'contentful';
import { getProjectImage, getHeroImage } from './cloudinary-proxy';

// Content type interfaces
export interface ProjectFields {
  title: string;
  slug: string;
  client: string;
  year: string;
  category: string;
  description: string;
  coverImage: Asset;
  gallery?: Asset[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface SkillFields {
  name: string;
  category: 'Frontend' | 'Backend' | 'Cloud' | 'Database';
  level: number;
}

export interface ExperienceFields {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

// Initialize Contentful client
const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
  host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com'
});

/**
 * Transform Contentful image URLs through Cloudinary proxy
 */
function transformAsset(asset: Asset | undefined) {
  if (!asset?.fields?.file?.url) return null;

  const contentfulUrl = asset.fields.file.url;
  return {
    url: contentfulUrl,
    optimized: getProjectImage(contentfulUrl),
    title: asset.fields.title || '',
    description: asset.fields.description || ''
  };
}

/**
 * Get all projects from Contentful
 */
export async function getProjects() {
  try {
    const response = await client.getEntries<ProjectFields>({
      content_type: 'project',
      order: ['-fields.featured', '-fields.year']
    });

    return response.items.map(item => ({
      id: item.sys.id,
      ...item.fields,
      coverImage: transformAsset(item.fields.coverImage),
      gallery: item.fields.gallery?.map(transformAsset).filter(Boolean)
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string) {
  try {
    const response = await client.getEntries<ProjectFields>({
      content_type: 'project',
      'fields.slug': slug,
      limit: 1
    });

    if (response.items.length === 0) return null;

    const item = response.items[0];
    return {
      id: item.sys.id,
      ...item.fields,
      coverImage: transformAsset(item.fields.coverImage),
      gallery: item.fields.gallery?.map(transformAsset).filter(Boolean)
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

/**
 * Get all skills from Contentful
 */
export async function getSkills() {
  try {
    const response = await client.getEntries<SkillFields>({
      content_type: 'skill',
      order: ['-fields.level']
    });

    return response.items.map(item => ({
      id: item.sys.id,
      ...item.fields
    }));
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

/**
 * Get all experiences from Contentful
 */
export async function getExperiences() {
  try {
    const response = await client.getEntries<ExperienceFields>({
      content_type: 'experience',
      order: ['-fields.current', '-fields.startDate']
    });

    return response.items.map(item => ({
      id: item.sys.id,
      ...item.fields
    }));
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}