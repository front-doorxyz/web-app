# Ceramic 

## Setup

In order to use ceramic, you need to run a deamon. 
Details here:
https://composedb.js.org/docs/0.4.x/set-up-your-environment

install global tools
```shell
yarn global add @ceramicnetwork/cli
yarn global add @composedb/cli
yarn dlx @ceramicnetwork/cli daemon
```

Spin up the ceramic daemon
```shell
ceramic daemon --network=testnet-clay
```

You would need to add your admin did in `~/.ceramic/daemon.config.json` in order to use the commands that require authentication.
https://composedb.js.org/docs/0.4.x/set-up-your-environment#using-your-account
```json
{
  ...
  "admin-dids": ["did:key:..."]
  ...
}
```

If you have none, you can create those with the following command:
```shell
glaze did:create
```
This will create a did key and a did seed
https://developers.ceramic.network/build/cli/quick-start/


## Create models and composits
https://composedb.js.org/docs/0.4.x/create-your-composite
https://composedb.js.org/docs/0.4.x/guides/data-modeling/schemas

Write a "createModel"
E.g. JobListing-create.graphql
```graphql
type JobListing @createModel(accountRelation: LIST, description: "Job listings")
    roleTitle: String! @string(maxLength: 127)
    description: String! @string(maxLength: 127)
    location: String!  @string(maxLength: 127)
    maxSalary: Int @int(min: 1, max: 2147483647)
    minSalary: Int @int(min: 1, max: 2147483647)
    bounty: Int @int(min: 1, max: 2147483647)
    companyName: String! @string(maxLength: 127)
}
```

## Create a composite
https://composedb.js.org/docs/0.4.x/guides/data-modeling/composites#creating-composites

```shell
composedb composite:create JobListing-create.graphql --output=JobListing-composite.json --did-private-key=$GLAZE_DID_SEED
```

JobListing-composite.json
```json
{
  "version": "1.0",
  "models": {
    "kjzl6hvfrbw6cahsqm3n5prd3h661txxvuvson0tvj2cs035j32evnd9x26isll": [
      {
        "jws": {
          "payload": "AXESIFIsH4FSLnqOnbdt2BfW2Ep_bIehmUx_eMvrXR6ylozB",
          "signatures": [
            {
              "signature": "WIhEUan9tiA9OuZJcr7AKLyCmZjHo80OH5JNBHliw1XXP26_CKrrYCP9fYk4gxXsQVblLVIPVCWruEGZexzpCw",
              "protected": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa2V4ZUJWM2IxRUhZQm1FOERRYk04ZUF3RERuMXBKMlF1VHBENzVldUs2cFpmI3o2TWtleGVCVjNiMUVIWUJtRThEUWJNOGVBd0REbjFwSjJRdVRwRDc1ZXVLNnBaZiJ9"
            }
          ],
          "link": "bafyreicsfqpycuropkhj3n3n3al5nwckp5wipimzjr7xrs7lluplffumye"
        },
        "linkedBlock": "omRkYXRhp2RuYW1lakpvYkxpc3Rpbmdldmlld3OgZnNjaGVtYaVkdHlwZWZvYmplY3RnJHNjaGVtYXgsaHR0cHM6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQvMjAyMC0xMi9zY2hlbWFocmVxdWlyZWSEaXJvbGVUaXRsZWtkZXNjcmlwdGlvbmhsb2NhdGlvbmtjb21wYW55TmFtZWpwcm9wZXJ0aWVzp2Zib3VudHmjZHR5cGVnaW50ZWdlcmdtYXhpbXVtGn////9nbWluaW11bQFobG9jYXRpb26iZHR5cGVmc3RyaW5naW1heExlbmd0aBh/aW1heFNhbGFyeaNkdHlwZWdpbnRlZ2VyZ21heGltdW0af////2dtaW5pbXVtAWltaW5TYWxhcnmjZHR5cGVnaW50ZWdlcmdtYXhpbXVtGn////9nbWluaW11bQFpcm9sZVRpdGxlomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgYf2tjb21wYW55TmFtZaJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGH9rZGVzY3JpcHRpb26iZHR5cGVmc3RyaW5naW1heExlbmd0aBh/dGFkZGl0aW9uYWxQcm9wZXJ0aWVz9Gd2ZXJzaW9uYzEuMGlyZWxhdGlvbnOga2Rlc2NyaXB0aW9ubEpvYiBsaXN0aW5nc29hY2NvdW50UmVsYXRpb26hZHR5cGVkbGlzdGZoZWFkZXKjY3NlcGVtb2RlbGVtb2RlbFLOAQQBcXELAAlobW9kZWwtdjFrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtleGVCVjNiMUVIWUJtRThEUWJNOGVBd0REbjFwSjJRdVRwRDc1ZXVLNnBaZg=="
      }
    ]
  },
  "aliases": {},
  "views": {
    "account": {},
    "root": {},
    "models": {}
  }
}
```

## Compile the composite

```shell
composedb composite:compile JobListing-composite.json JobListing-runtime-composite.json
```

will crate an object like this:
JobListing-runtime-composite.json
```json
{
  "models": {
    "JobListing": {
      "id": "kjzl6hvfrbw6cahsqm3n5prd3h661txxvuvson0tvj2cs035j32evnd9x26isll",
      "accountRelation": {
        "type": "list"
      }
    }
  },
  "objects": {
    "JobListing": {
      "bounty": {
        "type": "integer",
        "required": false
      },
      "location": {
        "type": "string",
        "required": true
      },
      "maxSalary": {
        "type": "integer",
        "required": false
      },
      "minSalary": {
        "type": "integer",
        "required": false
      },
      "roleTitle": {
        "type": "string",
        "required": true
      },
      "companyName": {
        "type": "string",
        "required": true
      },
      "description": {
        "type": "string",
        "required": true
      }
    }
  },
  "enums": {},
  "accountData": {
    "jobListingList": {
      "type": "connection",
      "name": "JobListing"
    }
  }
}
```

To compile your composite for import and use with the JavasScript Client, just specify an output file ending in .js

```shell
composedb composite:compile JobListing-composite.json JobListing-runtime-composite.js
```

JobListing-runtime-composite.js
```js
export const definition = {
    "models": {
        "JobListing": {
            "id": "kjzl6hvfrbw6cahsqm3n5prd3h661txxvuvson0tvj2cs035j32evnd9x26isll",
            "accountRelation": {"type": "list"}
        }
    },
    "objects": {
        "JobListing": {
            "bounty": {"type": "integer", "required": false},
            "location": {"type": "string", "required": true},
            "maxSalary": {"type": "integer", "required": false},
            "minSalary": {"type": "integer", "required": false},
            "roleTitle": {"type": "string", "required": true},
            "companyName": {"type": "string", "required": true},
            "description": {"type": "string", "required": true}
        }
    },
    "enums": {},
    "accountData": {"jobListingList": {"type": "connection", "name": "JobListing"}}
}
```


create graphQl schema for the composite:

```shell
composedb graphql:schema JobListing-runtime-composite.json --output=JobListing-schema.graphql
```

