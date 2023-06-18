// This is an auto-generated file, do not edit manually
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
