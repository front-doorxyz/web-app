#!/usr/bin/node

import { ComposeClient } from '@composedb/client'
//import { definition } from "./compose_models/job-listing/JobListing-runtime-composite"
import { definition } from "./compose_models/simple-profile/SimpleProfile-runtime-composite"


const ceramicUrl = process.env.CERAMIC_CLIENT_INSTANCE_URL || "http://localhost:7007";
console.log("Ceramic client instance url to be used for compose DB:", ceramicUrl);

const compose = new ComposeClient({ ceramic: ceramicUrl, definition });



async function main() {
    await compose.executeQuery(`
  query {
    viewer {
      id
    }
  }
`)
}

main().then(() => {console.log("Done")}).catch((err) => {console.error(err)})
