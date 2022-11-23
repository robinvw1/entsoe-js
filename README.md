<h1 align="center">
    entsoe-js
</h1>
<p align="center">
    Unofficial NodeJS library for the ENTSO-E Transparency Platform API
</p>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]
[![bundle][bundle-src]][bundle-href]

---

## ✨ Features

-   Day ahead prices.
-   Written in `TypeScript`.
-   Battle tested with 100% code coverage.

## 🚀 Quick start

Install:

```bash
# npm
npm i entsoe-js

# yarn
yarn add entsoe-js

# pnpm
pnpm i entsoe-js
```

Usage:

```js
import { Client, BiddingZone } from 'entsoe-js';

const client = new Client({
    securityToken: process.env.ENTSOE_API_KEY
});

const prices = await client.dayAheadPrices({
    biddingZone: BiddingZone.NL
});
```

## Security token

To get access to an security token you need to register the [Transparency Platform](https://transparency.entsoe.eu/dashboard/show) and send an email to transparency@entsoe.eu with `Restful API access` in the subject line. Indicate the email address you entered during registration in the email body. When granted access there will be an option to generate a security token under account settings.

## Thanks

Thanks to Robin Hansson for his work and inspiration: https://github.com/rabinage/entsoe-api-node

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/entsoe-js?style=flat-square
[npm-version-href]: https://npmjs.com/package/entsoe-js
[npm-downloads-src]: https://img.shields.io/npm/dm/entsoe-js?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/entsoe-js
[github-actions-src]: https://img.shields.io/github/workflow/status/robinvw1/entsoe-js/ci/main?style=flat-square
[github-actions-href]: https://github.com/robinvw1/entsoe-js/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/robinvw1/entsoe-js/main?style=flat-square
[codecov-href]: https://codecov.io/gh/robinvw1/entsoe-js
[bundle-src]: https://img.shields.io/bundlephobia/minzip/entsoe-js?style=flat-square
[bundle-href]: https://bundlephobia.com/result?p=entsoe-js
