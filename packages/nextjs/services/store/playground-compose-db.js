#!/usr/bin/node
//import { definition } from "./compose_models/job-listing/JobListing-runtime-composite"
//import {definition} from "./compose_models/simple-profile/SimpleProfile-runtime-composite.js"
import { definition } from "./compose_models/job-listing/JobListing-runtime-composite.js";
import { ComposeClient } from "@composedb/client";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays/from-string";

// import { readEncodedComposite, writeEncodedComposite } from '@composedb/devtools-node'

const ceramicUrl = process.env.CERAMIC_CLIENT_INSTANCE_URL || "http://localhost:7007";
console.log("Ceramic client instance url to be used for compose DB:", ceramicUrl);

// debug private key
// TODO replace with real environment variable admin key
const CERAMIC_ADMIN_KEY =
  process.env.GLAZE_DID_SEED || "0143f467e77d68ff5f9311241099872aa095674179eb6d503773502d1ec31255";

const randomSeed = () => {
  const seed = new Uint8Array(randomBytes(32));
  return toString(seed, "base16");
};

const newDid = async seed => {
  if (seed === null) {
    seed = randomSeed();
  }
  const did = new DID({
    provider: new Ed25519Provider(fromString(seed, "base16")),
    resolver: getResolver(),
  });
  await did.authenticate();
  return did;
};

async function main() {
  const ceramicClient = new ComposeClient({ ceramic: ceramicUrl, definition });
  ceramicClient.setDID(await newDid(CERAMIC_ADMIN_KEY));

  await one(ceramicClient);
}

async function main2() {
  const ceramicClient = new ComposeClient({ ceramic: ceramicUrl, definition });
  ceramicClient.setDID(await newDid(CERAMIC_ADMIN_KEY));

  await fetchJobListingById(ceramicClient, "kjzl6kcym7w8y6dggv1i48t71p02z7v9r2ax83eq0setnm6fqmu59asqivb67kw");
}

async function fetchJobListingById(ceramicClient, id) {
  let response = await ceramicClient.executeQuery(`
            query {
                jobListingIndex(id: "${id}") {
                    edges {
                        node {
                            id
                            roleTitle
                            description
                            location
                            maxSalary
                            minSalary
                            bounty
                            companyName
                        }
                    }
                }
            }
        `);

  console.log("result:", JSON.stringify(response));
}

async function second_two(ceramicClient) {
  let result = await ceramicClient.executeQuery(`
            query{
                jobListingIndex(last:1000) {
                    edges {
                        node {
                            id
                            roleTitle
                            description
                            location
                            maxSalary
                            minSalary
                            bounty
                            companyName
                        }
                    }
                }
            }
        `);

  //console.log("Response:", response);
  console.log("result:", JSON.stringify(result));
}

async function second_one(ceramicClient) {
  let response = await ceramicClient.executeQuery(
    `
    mutation CreateNewJobListing($i: CreateJobListingInput!) {
          createJobListing(input: $i) {
            document {
                id
                roleTitle
                description
                location
                maxSalary
                minSalary
                bounty
                companyName
            }
          }
        }
        `,
    {
      i: {
        content: {
          bounty: 1000,
          location: "dasdadas",
          maxSalary: 100000,
          minSalary: 10,
          roleTitle: "sdaadsas",
          companyName: "google",
          description: "dsaasdasasd",
        },
      },
    },
  );

  let response2 = await ceramicClient.executeQuery(
    `
    mutation CreateNewJobListing($i: CreateJobListingInput!) {
          createJobListing(input: $i) {
            document {
                id
                roleTitle
                description
                location
                maxSalary
                minSalary
                bounty
                companyName
            }
          }
        }
        `,
    {
      i: {
        content: {
          bounty: 2000,
          location: "2dasdadas",
          maxSalary: 200000,
          minSalary: 20,
          roleTitle: "2sdaadsas",
          companyName: "2google",
          description: "2dsaasdasasd",
        },
      },
    },
  );
  console.log("result:", JSON.stringify(response));
  console.log("with id:", response.data.createJobListing.document.id);
  console.log("result:", JSON.stringify(response2));
  console.log("with id:", response2.data.createJobListing.document.id);
  second_two(ceramicClient);
}

async function three(ceramicClient, id) {
  let result = await ceramicClient.executeQuery(`
            query{
                allSimpleProfile() {
                    edges {
                        node {
                            id
                            displayName
                        }
                    }
                }
            }
        `);

  //console.log("Response:", response);
  console.log("result:", JSON.stringify(result));
}
async function two(ceramicClient, id) {
  let result = await ceramicClient.executeQuery(`
            query{
                simpleProfileIndex(last:1000) {
                    edges {
                        node {
                            id
                            displayName
                        }
                    }
                }
            }
        `);

  //console.log("Response:", response);
  console.log("result:", JSON.stringify(result));
}

async function one(ceramicClient) {
  let response = await ceramicClient.executeQuery(
    `
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
      i: {
        content: {
          displayName: "John Doe",
        },
      },
    },
  );

  let response2 = await ceramicClient.executeQuery(
    `
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
      i: {
        content: {
          displayName: "John Doe2",
        },
      },
    },
  );
  console.log("Response:", response);
  console.log("Response:", response2);
  console.log("with id:", response.data.createSimpleProfile.document.id);
  console.log("with id2:", response2.data.createSimpleProfile.document.id);

  await two(ceramicClient, response.data.createSimpleProfile.document.id);
  await three(ceramicClient, response.data.createSimpleProfile.document.id);
}

main2()
  .then(() => {
    console.log("Done");
  })
  .catch(err => {
    console.error(err);
  });
