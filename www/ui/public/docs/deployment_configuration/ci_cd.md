abstract: How Continuous deployment works.
hide_toc: true

Continuous deployment allows you to safely automate the testing and deployment of your application. It reduces the risk of manual deployments through repeatable, automated, tested deployments.

The major benefits of Continuous deployment are:

- reduce effort required to test your application
- more effectively discover and fix problems in your application
- reduce complexity, risk and effort of releasing application updates
- increase the speed you can iterate your application

Some teams choose to continuously deploy application changes straight to production. Other teams choose a Continuous delivery method. This is where application updates are continuously deployed to a development or staging site. There is a manual step to then release these updates from staging to production.

## How it works

Every time the application codebase changes, a continuous integration service will automatically compile and test your new codebase. If all tests pass it will also deploy the application.

Currently we use CircleCI as our continuous integration service.

Follow these steps to setup your application to do continuous deployment on cloud.gov.au

1. [Create a manifest.yml](/deployment_configuration/create_manifest/)
2. [Setup CircleCI](/deployment_configuration/setup_circle/)

Also consider using zero downtime deploys for you application. cloud.gov.au can do this using Blue/Green deploys.
