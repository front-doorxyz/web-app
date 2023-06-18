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


## Create models and composits
https://composedb.js.org/docs/0.4.x/create-your-composite
https://composedb.js.org/docs/0.4.x/guides/data-modeling

Create a "create" model
```graphql
type DisplayName @createModel(accountRelation: SINGLE, description: "Display name for a user") {
  displayName: String! @string(minLength: 3, maxLength: 50)
}
```
