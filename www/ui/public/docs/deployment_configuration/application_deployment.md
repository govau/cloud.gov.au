abstract: How to deploy your application to CloudFoundry using cf push.

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
