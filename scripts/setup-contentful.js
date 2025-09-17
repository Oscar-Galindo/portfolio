import contentfulManagement from 'contentful-management';
import dotenv from 'dotenv';

dotenv.config();

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN || 'YOUR_MANAGEMENT_TOKEN_HERE'
});

async function setupContentTypes() {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Create Project Content Type
    console.log('Creating Project content type...');
    const projectContentType = await environment.createContentTypeWithId('project', {
      name: 'Project',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true
        },
        {
          id: 'slug',
          name: 'Slug',
          type: 'Symbol',
          required: true,
          validations: [{ unique: true }]
        },
        {
          id: 'description',
          name: 'Short Description',
          type: 'Text',
          required: true
        },
        {
          id: 'longDescription',
          name: 'Long Description',
          type: 'RichText',
          required: true
        },
        {
          id: 'technologies',
          name: 'Technologies',
          type: 'Array',
          items: {
            type: 'Symbol'
          }
        },
        {
          id: 'githubUrl',
          name: 'GitHub URL',
          type: 'Symbol',
          required: false
        },
        {
          id: 'liveUrl',
          name: 'Live URL',
          type: 'Symbol',
          required: false
        },
        {
          id: 'featured',
          name: 'Featured',
          type: 'Boolean',
          required: true
        },
        {
          id: 'order',
          name: 'Display Order',
          type: 'Number',
          required: true
        },
        {
          id: 'coverImage',
          name: 'Cover Image',
          type: 'Link',
          linkType: 'Asset',
          required: true
        },
        {
          id: 'gallery',
          name: 'Gallery',
          type: 'Array',
          items: {
            type: 'Link',
            linkType: 'Asset'
          },
          required: false
        },
        {
          id: 'results',
          name: 'Key Results',
          type: 'Object',
          required: false
        }
      ]
    });

    await projectContentType.publish();
    console.log('✅ Project content type created and published');

    // Create Skill Content Type
    console.log('Creating Skill content type...');
    const skillContentType = await environment.createContentTypeWithId('skill', {
      name: 'Skill',
      displayField: 'name',
      fields: [
        {
          id: 'name',
          name: 'Name',
          type: 'Symbol',
          required: true
        },
        {
          id: 'category',
          name: 'Category',
          type: 'Symbol',
          required: true,
          validations: [{
            in: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Soft Skills']
          }]
        },
        {
          id: 'level',
          name: 'Skill Level (1-100)',
          type: 'Number',
          required: true,
          validations: [{
            range: { min: 1, max: 100 }
          }]
        },
        {
          id: 'icon',
          name: 'Icon Class',
          type: 'Symbol',
          required: false
        }
      ]
    });

    await skillContentType.publish();
    console.log('✅ Skill content type created and published');

    // Create Experience Content Type
    console.log('Creating Experience content type...');
    const experienceContentType = await environment.createContentTypeWithId('experience', {
      name: 'Experience',
      displayField: 'company',
      fields: [
        {
          id: 'company',
          name: 'Company',
          type: 'Symbol',
          required: true
        },
        {
          id: 'position',
          name: 'Position',
          type: 'Symbol',
          required: true
        },
        {
          id: 'startDate',
          name: 'Start Date',
          type: 'Date',
          required: true
        },
        {
          id: 'endDate',
          name: 'End Date',
          type: 'Date',
          required: false
        },
        {
          id: 'current',
          name: 'Current Position',
          type: 'Boolean',
          required: true
        },
        {
          id: 'description',
          name: 'Description',
          type: 'RichText',
          required: true
        },
        {
          id: 'achievements',
          name: 'Key Achievements',
          type: 'Array',
          items: {
            type: 'Symbol'
          }
        },
        {
          id: 'technologies',
          name: 'Technologies Used',
          type: 'Array',
          items: {
            type: 'Symbol'
          }
        }
      ]
    });

    await experienceContentType.publish();
    console.log('✅ Experience content type created and published');

    // Create Testimonial Content Type
    console.log('Creating Testimonial content type...');
    const testimonialContentType = await environment.createContentTypeWithId('testimonial', {
      name: 'Testimonial',
      displayField: 'author',
      fields: [
        {
          id: 'author',
          name: 'Author Name',
          type: 'Symbol',
          required: true
        },
        {
          id: 'position',
          name: 'Position',
          type: 'Symbol',
          required: true
        },
        {
          id: 'company',
          name: 'Company',
          type: 'Symbol',
          required: true
        },
        {
          id: 'content',
          name: 'Testimonial Content',
          type: 'Text',
          required: true
        },
        {
          id: 'rating',
          name: 'Rating',
          type: 'Number',
          required: false,
          validations: [{
            range: { min: 1, max: 5 }
          }]
        },
        {
          id: 'image',
          name: 'Author Image',
          type: 'Link',
          linkType: 'Asset',
          required: false
        },
        {
          id: 'featured',
          name: 'Featured',
          type: 'Boolean',
          required: true
        }
      ]
    });

    await testimonialContentType.publish();
    console.log('✅ Testimonial content type created and published');

    console.log('\n🎉 All content types have been created successfully!');
    console.log('You can now go to your Contentful space and start adding content.');

  } catch (error) {
    console.error('Error setting up content types:', error);
    if (error.message?.includes('already exists')) {
      console.log('Some content types may already exist. Check your Contentful space.');
    }
  }
}

setupContentTypes();