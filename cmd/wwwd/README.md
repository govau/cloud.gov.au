# cloud.gov.au www server

`wwwd` (www daemon) is the cloud.gov.au "www" website server.

## Set up

Be sure to follow the steps in the project's README before proceeding.

## Development

Build and run the program:

```sh
go install
wwwd
```

## Production

Build the program for a Cloud Foundry deployment:

```sh
go install -tags="cloudfoundry"
```
