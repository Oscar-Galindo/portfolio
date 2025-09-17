import contentful from 'contentful';
import type { EntryFieldTypes } from 'contentful';

export interface ProjectFields {
  contentTypeId: 'project';
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    longDescription: EntryFieldTypes.RichText;
    technologies: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    githubUrl?: EntryFieldTypes.Text;
    liveUrl?: EntryFieldTypes.Text;
    featured: EntryFieldTypes.Boolean;
    order: EntryFieldTypes.Number;
    coverImage: EntryFieldTypes.AssetLink;
    gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    results?: EntryFieldTypes.Object;
  };
}

export interface SkillFields {
  contentTypeId: 'skill';
  fields: {
    name: EntryFieldTypes.Text;
    category: EntryFieldTypes.Text;
    level: EntryFieldTypes.Number;
    icon?: EntryFieldTypes.Text;
  };
}

export interface ExperienceFields {
  contentTypeId: 'experience';
  fields: {
    company: EntryFieldTypes.Text;
    position: EntryFieldTypes.Text;
    startDate: EntryFieldTypes.Date;
    endDate?: EntryFieldTypes.Date;
    current: EntryFieldTypes.Boolean;
    description: EntryFieldTypes.RichText;
    achievements: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    technologies: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  };
}

const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_ACCESS_TOKEN,
  host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
});

export async function getProjects() {
  const entries = await contentfulClient.getEntries<ProjectFields>({
    content_type: 'project',
    order: ['-fields.featured', 'fields.order'],
  });
  return entries.items;
}

export async function getProject(slug: string) {
  const entries = await contentfulClient.getEntries<ProjectFields>({
    content_type: 'project',
    'fields.slug': slug,
    limit: 1,
  });
  return entries.items[0];
}

export async function getSkills() {
  const entries = await contentfulClient.getEntries<SkillFields>({
    content_type: 'skill',
    order: ['-fields.level'],
  });
  return entries.items;
}

export async function getExperiences() {
  const entries = await contentfulClient.getEntries<ExperienceFields>({
    content_type: 'experience',
    order: ['-fields.current', '-fields.startDate'],
  });
  return entries.items;
}