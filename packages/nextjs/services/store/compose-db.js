#!/usr/bin/node

import { ComposeClient } from '@composedb/client'
//import { definition } from "./compose_models/job-listing/JobListing-runtime-composite"
import { definition } from "./compose_models/simple-profile/SimpleProfile-runtime-composite.js"
// import { readEncodedComposite, writeEncodedComposite } from '@composedb/devtools-node'


const ceramicUrl = process.env.CERAMIC_CLIENT_INSTANCE_URL || "http://localhost:7007";
console.log("Ceramic client instance url to be used for compose DB:", ceramicUrl);
const did = "0143f467e77d68ff5f9311241099872aa095674179eb6d503773502d1ec31255";

const ceramicClient = new ComposeClient({ ceramic: ceramicUrl, definition });
ceramicClient.setDID(did);




async function main() {
    let response = await ceramicClient.executeQuery(`
    mutation CreateNewSimpleProfile($i: CreateSimpleProfileInput!) {
  createSimpleProfile(input: $i) {
    document {
      id
      displayName
    }
  }
}

`,
        {
            "i": {
                "content": {
                    "displayName": "John Doe"
                }
            }
        }
        )
    console.log("Response:", response);
}

main().then(() => {console.log("Done")}).catch((err) => {console.error(err)})
