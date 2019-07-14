# cloud.gov.au www UI

## Set up

Be sure to follow the steps in the project's README before proceeding.

Install dependencies:

```sh
yarn install
```

## Requirements

- Node.js 9+ (use something like [`n` to manage node versions](https://github.com/tj/n) locally)
- Yarn

## Development

Start the server locally:

```sh
REACT_APP_API_ENDPOINT="" \
yarn start
```

- Set `REACT_APP_API_ENDPOINT` to the URL of the www API server. During development this would usually be a local server but for a faster frontend set up it can also be a running live service such as `https://www.system.d.cld.gov.au`

## Testing

```sh
yarn test
```

## Before committing

Make sure the code formatter has run:

```sh
yarn format
```

Alternatively, [configure your editor to run `pretter` on save](https://prettier.io/docs/en/editors.html).

## Production

Build the frontend distribution:

```sh
yarn build
```
