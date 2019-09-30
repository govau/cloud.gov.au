---
layout: page
title: Getting started
sidebar: docs
---

## Join an existing project or start a new one

How to get a cloud.gov.au account and join or create a project.

Accounts are available for Digital Transformation Agency (DTA) staff, as well as staff from government agencies that have an agreement with the DTA to use cloud.gov.au. If your agency is interested in using cloud.gov.au, please [email us](mailto:support@cloud.gov.au) so we can discuss your needs.
{: .au-callout}

### Join an existing project

#### 1. Create your account

Send an email to [support@cloud.gov.au](mailto:support@cloud.gov.au) using the following template:

```
G`Day cloud.gov.au team

Could you please create a cloud.gov.au account for me?

email: <your email here>
Mobile number: <your mobile number here>

Regards,

Jane Doe
<your team name here>

```

##### Response time

You should expect to hear from us within 1 working day.

#### 2. Request access to the existing project

To get access, please contact your project’s CloudFoundry maintainer. This is usually the Delivery Manager or Tech Lead.

If you have any problems, please [send us a support ticket](mailto:support@cloud.gov.au).

### Start a new project

We will setup the Github and Cloud Foundry infrastructure you need to start deploying your application.

#### 1. Request a new project on cloud.gov.au

To request the setup of a new project send a support request to [support@cloud.gov.au](mailto:support@cloud.gov.au) using the following template:

```
G`Day cloud.gov.au team

Could you please setup our team so that we may make use of cloud.gov.au?

Project Name:  <project name here>
Project team maintainer: <email here> <GitHub handle here>


| Email                | Mobile Number | GitHub handle   |
| -------------------- | ------------- | --------------- |
| jane.doe@example.com | 0400 xxx xxx  | therealjane     |
| john.doe@example.com | 0400 xxx xxx  | therealjohn     |
| ...                  | ...           | ...             |


Regards,

Jane Doe
Team Lead
<Team name here>

```

##### Please note:

- We use the information you give us to create Github and Cloud Foundry accounts for your team.
- You can list as many team members as you need.
- It is important that you nominate a project maintainer in your request. The project maintainer has admin access to the GitHub team and CloudFoundry space. This means that the project maintainer can add and remove team members once the project is setup.

##### Response time

You should expect to hear from someone from the cloud.gov.au team within 1 working day.

#### 2. Access your project through Github and Cloud Foundry

Once your request is processed, you will be given:

A new GitHub team on the AusDTO GitHub organisation

- AusDTO GitHub is where you manage your application’s source code.
- We populate your GitHub team with the user accounts you provide.

A new CloudFoundry project

- CloudFoundry is where you manage your application.
- We use your project name as the CloudFoundry Space name.
- We create user accounts and grant access to the space using the emails you supplied.
- We send your team their account passwords using the mobile numbers you supplied.



## Install command line tools

As a user, most of your interactions with Cloud Foundry will be through the command line.

Install the `cf` command line tool using the instructions at [https://docs.cloudfoundry.org/cf-cli/install-go-cli.html](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html).

Confirm the installation was successful by running:

```
cf -v
```



## Login to CloudFoundry

<div class="au-callout">
<p>Before you can login you will need to:</p>
<ul>
<li><a href="/getting_started/install_cli/">install CloudFoundry command line tools</a></li>
<li>be a member of an existing project on cloud.gov.au</li>
</ul>
</div>

If you are starting a new project then you will need to [Request a new project](/getting_started/request_access/#start-a-new-project)

If you need access to an existing project then ask the projects CloudFoundry maintainer. This is usually the Delivery Manager or Tech Lead. If you get stuck you can [send us a support ticket](mailto:support@cloud.gov.au).

### Login to your project

```
cf login -a https://api.system.y.cld.gov.au
```

You will then need to enter your email address and password.

Select your project from the list of available Orgs and Spaces.

You can also define your login options all at once with:

```
cf login -a https://api.system.y.cld.gov.au -u <email> -o <org> -s <space>
cf login -a https://api.system.y.cld.gov.au --sso
```

<div class="au-callout">
<p>Please note: DTA users must login with their digital.gov.au account using single sign-on.</p>
<pre><code>cf login -a https://api.system.y.cld.gov.au --sso</code></pre>
</div>

### How to target a different project

```
cf target -o <org> -s <space>
```

The `<org>` is the CloudFoundry organisation. This is usually the name of the project.

The `<space>` is the CloudFoundry space. This is usually the name of the application.

For example:

```
cf target -o digital-marketplace -s marketplace-frontend
```

Now you can deploy and manage your application from the Command Line.