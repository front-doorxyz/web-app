#!/usr/bin/node

import {ComposeClient} from '@composedb/client'
import { definition } from "./compose_models/job-listing/JobListing-runtime-composite.js"
import {DID} from 'dids'
import {Ed25519Provider} from 'key-did-provider-ed25519'
import {getResolver} from 'key-did-resolver'
import {fromString} from 'uint8arrays/from-string'
import {JobListing} from "./model.js";


const ceramicUrl = process.env.CERAMIC_CLIENT_INSTANCE_URL || "http://localhost:7007";
console.log("Ceramic client instance url to be used for compose DB:", ceramicUrl);

// debug private key
// TODO replace with real environment variable admin key
const CERAMIC_ADMIN_KEY = process.env.GLAZE_DID_SEED || "0143f467e77d68ff5f9311241099872aa095674179eb6d503773502d1ec31255";


const newDid = async (seed) => {
    const did = new DID({
        provider: new Ed25519Provider(fromString(seed, 'base16')),
        resolver: getResolver()
    });
    await did.authenticate();
    return did;
}

async function getCeramicClient() {
    const ceramicClient = new ComposeClient({ceramic: ceramicUrl, definition});
    ceramicClient.setDID(await newDid(CERAMIC_ADMIN_KEY))
}



export async function createJobListing (jobListing) {
    console.log('Creating job listing from:', jobListing)
    const ceramicClient = await getCeramicClient();

    let response = await ceramicClient.executeQuery(`
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
            "i": {
                "content": {
                    "bounty": jobListing.bounty,
                    "location": jobListing.location,
                    "maxSalary": jobListing.maxSalary,
                    "minSalary": jobListing.minSalary,
                    "roleTitle": jobListing.roleTitle,
                    "companyName": jobListing.companyName,
                    "description": jobListing.description
                }
            }
        }
    )

    console.log('JobListing added with id:', response.data.createJobListing.document.id)
    jobListing.id = response.data.createJobListing.document.id;

    return jobListing;
}

export async function readJobListingById (id) {
    return database[id];
}

function edgeToJobListing(edge) {
    return {
        id: edge.node.id,
        roleTitle: edge.node.roleTitle,
        description: edge.node.description,
        location: edge.node.location,
        maxSalary: edge.node.maxSalary,
        minSalary: edge.node.minSalary,
        bounty: edge.node.bounty,
        companyName: edge.node.companyName
    }
}

export async function readAllJobListings() {

    console.log('Reading all job listing from:', jobListing)
    const ceramicClient = await getCeramicClient();

    let response = await ceramicClient.executeQuery(`
            query{
                jobListingIndex(last:20) {
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

    const allListings = response.data.jobListingIndex.edges.map((edge) => edgeToJobListing(edge))
    console.log('All job listings count ', allListings.length)
    return allListings;
}

main2().then(() => {console.log("Done")}).catch((err) => {console.error(err)})
