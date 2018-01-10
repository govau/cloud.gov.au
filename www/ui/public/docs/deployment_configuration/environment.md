abstract: How to add secure environment variables to CloudFoundry.

Show the current environment variables for an app with:

    cf env APP_NAME

Add an environment variable to an app with:

    cf set-env APP_NAME ENV_VAR_NAME ENV_VAR_VALUE

Remove an environment variable from an app with:

    cf unset-env APP_NAME ENV_VAR_NAME
