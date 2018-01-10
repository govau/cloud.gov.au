abstract: How to login to CloudFoundry

```marksy
<strong>Test</strong>
```

<div class="callout">
<p>Before you can login you will need to:</p>
<ul>
<li><a href="/getting_started/install_cli/">install CloudFoundry command line tools</a></li>
<li>be a member of an existing project on cloud.gov.au</li>
</ul>

</div>

If you are starting a new project then you will need to [Request a new project](/getting_started/request_access/#start-a-new-project)

If you need access to an existing project then ask the projects CloudFoundry maintainer. This is usually the Delivery Manager or Tech Lead. If you get stuck you can [send us a support ticket](mailto:support@cloud.gov.au).

## Login to your project

```
cf login -a https://api.system.staging.digital.gov.au
```

You will then need to enter your email address and password.

Select your project from the list of available Orgs and Spaces.

You can also define your login options all at once with:

```
cf login -a https://api.system.staging.digital.gov.au -u <email> -o <org> -s <space>
```

## How to target a different project

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
