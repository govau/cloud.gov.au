title: Create manifest.yml

abstract: How to configure the deployment settings of your CloudFoundry application.

Application manifests tell `cf push` what to do with applications. This includes information such as disk size and which buildpack to use.

Here is a basic manifest.yml example for a static site

```yaml
---

path: _site
instances: 1
memory: 64M
disk_quota: 256M
buildpack: staticfile_buildpack
```

Read more about [how to deploy with application manifests](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html).
