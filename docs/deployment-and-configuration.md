---
layout: page
title: Deployment and configuration
sidebar: docs
---

## Push an application

The command to create a new app and to push a new version of an existing one are the same: `cf push`.

Cloud Foundry isn’t version-control-aware. `cf push` will deploy the working state of whatever files you have in your current directory.

Before deploying your application you should [setup a manifest.yml](/deployment_configuration/create_manifest/). The manifest.yml file tells `cf push` what to do. This includes everything from how many instances to create to how much memory or disk space to assign.

Another option is to define these configurations as options to `cf push`. Not defining configuration options at all may slow down your deployments or provide too many or too few resources for your application.

The basic steps to deploy your application are:

1. Check out whatever version of the code you want to deploy.

        git checkout master

2. Target the appropriate organisation/space.

        cf target -o <SOMEORG> -s <SOMESPACE>

3. Deploy the application.

        cf push <APPNAME>

    If your project does not have a manifest.yml or you would like to override any configuration in the project manifest.yml then you should specify deployment configurations at the time of deployment.

        cf push -b <BUILDPACK> -n <APPNAME> -i 1 -m 64M -k 256M

    To view all options run `cf push --help`

The app should now be live at APPNAME.apps.staging.digital.gov.au.



## Delete an application

Get a list of existing apps deployed in the current space with:

```
cf apps
```

Delete an application from the platform with:

```
cf delete <appname>
```

**It is not possible to undo an application deletion**



## Setup continuous deployment

Continuous deployment allows you to safely automate the testing and deployment of your application. It reduces the risk of manual deployments through repeatable, automated, tested deployments.

The major benefits of Continuous deployment are:

- reduce effort required to test your application
- more effectively discover and fix problems in your application
- reduce complexity, risk and effort of releasing application updates
- increase the speed you can iterate your application

Some teams choose to continuously deploy application changes straight to production. Other teams choose a Continuous delivery method. This is where application updates are continuously deployed to a development or staging site. There is a manual step to then release these updates from staging to production.

### How it works

Every time the application codebase changes, a continuous integration service will automatically compile and test your new codebase. If all tests pass it will also deploy the application.

Currently we use CircleCI as our continuous integration service.

Follow these steps to setup your application to do continuous deployment on cloud.gov.au

1. [Create a manifest.yml](/deployment_configuration/create_manifest/)
2. [Setup CircleCI](/deployment_configuration/setup_circle/)

Also consider using zero downtime deploys for you application. cloud.gov.au can do this using Blue/Green deploys.



## Setup CircleCI

CircleCI is the tool we use for Continuous Integration, Continuous Delivery and Continuous Deployment.

CircleCI automates the testing and deployment of your application. It runs whenever you change your application source code. You can configure configure how CircleCI works with the `circle.yml` file.

If you choose to use CircleCI for your project you will need to host your source code on GitHub or Bitbucket.

### Configure `circle.yml`

You will need to add a circle.yml file to the root directory of your application.

Here is the basic structure of a circle.yml file.

```
---
machine:
  ruby:
    version: 2.3.1

dependencies:
  override:
    - bin/ciprepare.sh

test:
  override:
    - bin/citest.sh

deployment:
  all:
    branch: /.*/
    commands:
      - bin/cideploy.sh
```

The `circle.yml` file has four phases:

- `machine:` specify what language the virtual machine needs to run your application. You can specify more than one.
- `dependencies:` install any dependencies for your application
- `test:` run your application tests
- `deployment:` deploy your code to cloud.gov.au

**CircleCI will not deploy your application if any of the above phases fail.**

Read the [Circle documentation on configuring your circle.yml file](https://circleci.com/docs/configuration/)

### Write CircleCI command scripts

We recommend you write commands for each CircleCI phase in separate shell scripts. This is helpful if your team chooses to use another CI/CD tool in the future. If you prefer you can write commands in the `circle.yml` file.

**Warning: If you are using environment variables in a shell script do not use `set -x`. This will log your environment variable values to CircleCI logs. Instead use `set -v`.**

You can see an [example of how we setup scripts](https://github.com/AusDTO/jalpha/tree/master/template/bin) for a simple Jekyll project.

### Add environment variables to CircleCI

CircleCI may need access to sensitive data to run tests and deploy your application. Examples of sensitive data are:

- CloudFoundry username and password
- API keys
- Login details for your application

Add sensitive data to CircleCI as environment variables. Do not save sensitive data in the source code.

To create an environment variable in CircleCI:

- [Login to the CircleCI dashboard](https://circleci.com/vcs-authorize/)
- Navigate to "Project settings"
- Select "Environment variables" in the "Build settings" section
- Select "Add variable"
- Give your new variable a `name` and add the `value` as the sensitive data

You can now call the sensitive data in your circle.yml or shell scripts as `$name`

**Warning: If you are using environment variables is a shell script do not use `set -x`. This will log your environment variable values to CircleCI logs. Instead use `set -v`.**

Read the [Circle documentation on environment variables](https://circleci.com/docs/environment-variables/)

#### Some commonly needed environment variables and how you can find them

<table class="au-table">
  <tbody>
	 <tr><th class="au-table__header">CF_API</th><td class="au-table__cell">bash: `cf api`</td></tr>
	 <tr><th class="au-table__header">CF_ORG</th><td class="au-table__cell">bash: `cf orgs`</td></tr>
	 <tr><th class="au-table__header">CF_PASSWORD</th><td class="au-table__cell">The password you use to log into CloudFoundry</td></tr>
	 <tr><th class="au-table__header">CF_SPACE</th><td class="au-table__cell">bash: `cf spaces`</td></tr>
	 <tr><th class="au-table__header">CF_USER</th><td class="au-table__cell">bash: `cf target` and use the value on the 'User:' row.</td></tr>
  </tbody>
</table>



## Create manifest.yml

Application manifests tell `cf push` what to do with applications. This includes information such as disk size and which buildpack to use.

Here is a basic manifest.yml example for a static site

```
---
path: _site
instances: 1
memory: 64M
disk_quota: 256M
buildpack: staticfile_buildpack
```

Read more about [how to deploy with application manifests](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html).



## Environment variables

Show the current environment variables for an app with:

    cf env APP_NAME

Add an environment variable to an app with:

    cf set-env APP_NAME ENV_VAR_NAME ENV_VAR_VALUE

Remove an environment variable from an app with:

    cf unset-env APP_NAME ENV_VAR_NAME



## Zero downtime deploys

When updating an application with `cf push`, there is some downtime while the application deploys. While this may be okay during development, it usually is not for production. You can solve this by having two copies of the application with a common route and updating them one at a time. This is called blue/green deploys.

Here is a basic `manifest.yml` example for using blue/green deploys:

```
...
host: app-name
applications:
- name: app-name-blue
- name: app-name-green
```

This file will:

1. Create a `host` at app-name.apps.staging.digital.gov.au. This is where you can view your application
2. Create two applications: `app-name-blue` and `app-name-green`

Users will route to either app-name-green or app-name-blue when they visit `host`

When you run `cf push` to update this application, it will first update `app-name-blue`.

This will:

1. Unmap the route from `app-name` to `app-name-blue`, causing all traffic to go to `app-name-green`
2. Stop `app-name-blue`
3. Update the files for `app-name-blue`
4. Start `app-name-blue`
5. Remap the route from `app-name` to `app-name-blue`, causing traffic to split between the two apps

Then it will do the same thing for `app-name-green`. This ensures the user
never experiences any downtime.

### Using a database

If your application requires a database, you will usually use the same database for the blue and green applications. This ensures that users have the same view of the data regardless of which app they are viewing.

This can make it harder to do database migrations. If the start command performs the database migration, the migration will run twice, once by the blue app and once by the green app. There is also a period where the green app is running the old code against the new database. To handle these issues, keep these principles in mind.

1. Database migrations should have the same effect regardless of how many times they execute
2. The new version of the database should work with both the old and new versions of the code



## Deploying feature branches

Many teams use feature branches to develop new features for their application.
Feature branches allow teams to test and review changes before deploying. It is useful to have a deployed version of a feature branch for reviewers to view. There are a few different ways of doing this.

### QA Fire

QA Fire is a project developed by the DTA to automatically deploy feature branches.
It deploys a unique staging version of the application for every new pull request on GitHub. Pushing new commits to the pull request will update the deployed feature branch. Closing the pull request will delete the deployed feature branch.

QA Fire is still at the beginning of its development and it does not work for all projects.
Check out the [QA Fire GitHub page](https://github.com/ausdto/qa-fire) for information on what
it can and can't do. In particular, it does not work for projects that need to be pre-built.
This includes static sites built with jekyll and mkdocs.

### CircleCI

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

### Manually deploying feature branches

You can also manually deploy your branches when you need them. This is the
best option if you don't need to deploy every branch. See
[Application Deployment](/deployment_configuration/application_deployment.md) for more information.

### Managing environment variables

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



## User management

Before you can assign a role to a team member they must have a cloud.gov.au account. The cloud.gov.au team creates new user accounts. Lodge a support ticket requesting to add a new user to cloud.gov.au.

### Manage your team

Only an Org Manager or Space Manager can assign, edit and remove user roles for an Org or Space.

If you're an Org Manager or Space Manager, here's how to give roles to your teammates to give them permissions for your orgs and spaces. For details about how cloud.gov.au org and space roles and permissions work, see [Cloud Foundry roles and permissions](http://docs.cloudfoundry.org/concepts/roles.html#roles).

First make sure you have [installed the CloudFoundry Command Line tools](/getting_started/install_cli/):

```
cf -v
```

#### Assign user roles

Assign a role to a CloudFoundry user to add them to your project.

* To give them read-only permissions to the organization, run:

        cf set-org-role <email> <org> OrgAuditor

* If you want to make them an admin for your organization, run:

        cf set-org-role <email> <org> OrgManager

* If you want to give them permission to deploy, add them to each space:

        cf set-space-role <email> <org> <space> SpaceDeveloper

#### Remove users

Remove a user from an Org or Space by unsetting their permissions.

* If you want to remove a user from an org:

        cf unset-org-role <email> <org> <role>

* If you want to remove a user from a space:

        cf unset-space-role <email> <org> <space> <role>

For a complete list of cloud.gov roles and permissions see [the Cloud Foundry guide to Org and Space Roles](https://docs.cloudfoundry.org/adminguide/cli-user-management.html#orgs-spaces).