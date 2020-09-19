# tenor-fetch

A library that lets you access the Tenor API. What's Tenor? A GIF search engine. 

Rad?

![Tenor in action](https://media1.tenor.com/images/c7504b9fb03c95b3b5687d744687e11c/tenor.gif)

Yeah. Totally rad.

Also, you should totally check out my rad start-up, [Tutturu.tv](https://tutturu.tv) 👏

# Installation

```
npm install --save tenor-fetch
```

# Getting started

You'll need an API key from Tenor: https://tenor.com/gifapi

```js
const TenorFetch = require('tenor-fetch');

const tf = new TenorFetch('YOUR-TENOR-API-KEY');

// Search "smug anime" on Tenor
tf.search('smug anime').then(console.log);

// Find trending GIFs on Tenor
tf.trending().then(console.log);
```

# API

Check out the endpoints here: https://tenor.com/gifapi/documentation#endpoints

This project is written in TypeScript so you can let IntelliSense guide you.

The library is pretty straightforward: if you're lost just glance at the [source](https://github.com/ScottyFillups/tenor-fetch/blob/master/src/index.ts).

# Tests

```
npm run test
```

# Contributing

Before you make a merge request, please:

1. Run `npm run lint` and `npm run format`
2. Ensure all existing tests pass
3. Add tests for your additions (if applicable)

Thanks! 💖

# Acknowledgements

Inspired from [@giphy/js-fetch-api](https://www.npmjs.com/package/@giphy/js-fetch-api).

I try my best to match the API. We have promises, but I can't promise you anything (haha).

Regarding the source code, I'm a total noob and I just followed the instructions [here](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c). Sorry.
