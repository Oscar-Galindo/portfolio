import { createClient } from 'contentful';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

async function testConnection() {
  try {
    console.log('Testing Contentful connection...');
    console.log('Space ID:', process.env.CONTENTFUL_SPACE_ID);

    const space = await client.getSpace();
    console.log('✅ Successfully connected to space:', space.name);

    const contentTypes = await client.getContentTypes();
    console.log('\nAvailable content types:');
    contentTypes.items.forEach(ct => {
      console.log(`- ${ct.name} (${ct.sys.id})`);
    });

    if (contentTypes.items.length === 0) {
      console.log('\n⚠️  No content types found. You need to create them in Contentful.');
      console.log('Run: node scripts/setup-contentful.js (after adding management token)');
    }

  } catch (error) {
    console.error('❌ Error connecting to Contentful:', error.message);
    console.error('Please check your credentials in .env file');
  }
}

testConnection();