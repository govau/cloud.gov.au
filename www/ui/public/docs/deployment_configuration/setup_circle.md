abstract: How to setup Continuous Deployment for your application.

CircleCI is the tool we use for Continuous Integration, Continuous Delivery and Continuous Deployment.

CircleCI automates the testing and deployment of your application. It runs whenever you change your application source code. You can configure configure how CircleCI works with the `circle.yml` file.

If you choose to use CircleCI for your project you will need to host your source code on GitHub or Bitbucket.

## Configure `circle.yml`

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

## Write CircleCI command scripts

We recommend you write commands for each CircleCI phase in separate shell scripts. This is helpful if your team chooses to use another CI/CD tool in the future. If you prefer you can write commands in the `circle.yml` file.

**Warning: If you are using environment variables in a shell script do not use `set -x`. This will log your environment variable values to CircleCI logs. Instead use `set -v`.**

You can see an [example of how we setup scripts](https://github.com/AusDTO/jalpha/tree/master/template/bin) for a simple Jekyll project.

## Add environment variables to CircleCI

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

### Some commonly needed environment variables and how you can find them

<table>
  <tbody>
	 <tr><th>CF_API</th><td>bash: `cf api`</td></tr>
	 <tr><th>CF_ORG</th><td>bash: `cf orgs`</td></tr>
	 <tr><th>CF_PASSWORD</th><td>The password you use to log into CloudFoundry</td></tr>
	 <tr><th>CF_SPACE</th><td>bash: `cf spaces`</td></tr>
	 <tr><th>CF_USER</th><td>bash: `cf target` and use the value on the 'User:' row.</td></tr>
  </tbody>
</table>
