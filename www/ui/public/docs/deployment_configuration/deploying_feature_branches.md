Many teams use feature branches to develop new features for their application.
Feature branches allow teams to test and review changes before deploying. It is useful to have a deployed version of a feature branch for reviewers to view. There are a few different ways of doing this.

## QA Fire

QA Fire is a project developed by the DTA to automatically deploy feature branches.
It deploys a unique staging version of the application for every new pull request on GitHub. Pushing new commits to the pull request will update the deployed feature branch. Closing the pull request will delete the deployed feature branch.

QA Fire is still at the beginning of its development and it does not work for all projects.
Check out the [QA Fire GitHub page](https://github.com/ausdto/qa-fire) for information on what
it can and can't do. In particular, it does not work for projects that need to be pre-built.
This includes static sites built with jekyll and mkdocs.

## CircleCI

You can configure CircleCI to run your deploy script for any branch.

```
deployment:
  feature:
    branch: /.*/
    commands:
      - bin/cideploy.sh
```

You can then use the [environment variables provided by CircleCI](https://circleci.com/docs/environment-variables/)
to deploy your branch. You can make a unique app name using the `$CIRCLE_BRANCH` and `$CIRCLE_PROJECT_REPONAME` variables.
If you have special characters like slashes in your branch names, you will need to remove them.

```
# Replace `/` with `-`
NAME=$(echo $CIRCLE_BRANCH | sed 's,/,-,g')
cf push $NAME-$CIRCLE_PROJECT_REPONAME
```

**Note: CircleCI will not delete your feature deploys. You will need to delete them manually.**

## Manually deploying feature branches

You can also manually deploy your branches when you need them. This is the
best option if you don't need to deploy every branch. See
[Application Deployment](/deployment_configuration/application_deployment.md) for more information.

## Managing environment variables

Many applications use environment variables to store secret information like API keys.
In QA Fire, you can set your environment variables once and they are set on all new deploys.
If you need to manually set environment variables, use can use the `cf set-env` command.

```
cf set-env APP_NAME ENV_VAR_NAME ENV_VAR_VALUE
```

You can also copy an existing app's environment using `cf create-app-manifest`.

```
cf create-app-manifest REFERENCE_APP_NAME -p /tmp/manifest.yml
cf push NEW_APP_NAME -f /tmp/manifest.yml
rm /tmp/manifest.yml
```

Be aware that `create-app-manifest` will write your secrets to disk.
This can have negative security implications.
Be sure to write the manifest to a private location and to delete the file once you no longer need it.
