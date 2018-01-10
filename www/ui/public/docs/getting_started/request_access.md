abstract: How to get a cloud.gov.au account and join or create a project.

<p class="callout">Currently, cloud.gov.au accounts are only available for DTA staff or external teams working with the DTA on existing projects.</p>

## Join an existing project

### 1. Create your account

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

#### Response time

You should expect to hear from us within 1 working day.

### 2. Request access to the existing project

To get access, please contact your project’s CloudFoundry maintainer. This is usually the Delivery Manager or Tech Lead.

If you have any problems, please [send us a support ticket](mailto:support@cloud.gov.au).

## Start a new project

We will setup the Github and Cloud Foundry infrastructure you need to start deploying your application.

### 1. Request a new project on cloud.gov.au

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

#### Please note:

- We use the information you give us to create Github and Cloud Foundry accounts for your team.
- You can list as many team members as you need.
- It is important that you nominate a project maintainer in your request. The project maintainer has admin access to the GitHub team and CloudFoundry space. This means that the project maintainer can add and remove team members once the project is setup.

#### Response time

You should expect to hear from someone from the cloud.gov.au team within 1 working day.

### 2. Access your project through Github and Cloud Foundry

Once your request is processed, you will be given:

A new GitHub team on the AusDTO GitHub organisation

- AusDTO GitHub is where you manage your application’s source code.
- We populate your GitHub team with the user accounts you provide.

A new CloudFoundry project

- CloudFoundry is where you manage your application.
- We use your project name as the CloudFoundry Space name.
- We create user accounts and grant access to the space using the emails you supplied.
- We send your team their account passwords using the mobile numbers you supplied.

<br />
<a class="see-more" href="/getting_started/install_cli/">Next step: Install command line tools</a>
