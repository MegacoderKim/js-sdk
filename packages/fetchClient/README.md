# Ht Fetch Client

### Installation

`npm i ht-js-fetch-client`

Peer dependencies that are needed
```
npm i whatwg-fetch
npm i ht-js-client
npm i ht-js-utils
npm i underscore
npm i moment-mini
```

### Usage

```
import { HtFetchClient } from "ht-js-fetch-client";
import 'whatwg-fetch'

const fetch = new HtFetchClient(<SECRET_KEY>)

fetch.action.index({page_size: 10}) //actions list
fetch.action.get(id: string) // action with id
fetch.actions.overview(query: object) //actions overview
```
