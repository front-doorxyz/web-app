import { ComposeClient }from '@composedb/client'


const ceramicUrl = process.env.CERAMIC_CLIENT_INSTANCE_URL || 'http://localhost:7007';
console.log('Ceramic client instance url to be used for compose DB:', ceramicUrl);

const compose = new ComposeClient({ ceramic: ceramicUrl, definition });
