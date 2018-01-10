abstract: How to add, remove and change user permissions.
hide_toc: true

Before you can assign a role to a team member they must have a cloud.gov.au account. The cloud.gov.au team creates new user accounts. Lodge a support ticket requesting to add a new user to cloud.gov.au.

## Manage your team

Only an Org Manager or Space Manager can assign, edit and remove user roles for an Org or Space.

If you're an Org Manager or Space Manager, here's how to give roles to your teammates to give them permissions for your orgs and spaces. For details about how cloud.gov.au org and space roles and permissions work, see [Cloud Foundry roles and permissions](http://docs.cloudfoundry.org/concepts/roles.html#roles).

First make sure you have [installed the CloudFoundry Command Line tools](/getting_started/install_cli/):

```
cf -v
```

### Assign user roles

Assign a role to a CloudFoundry user to add them to your project.

* To give them read-only permissions to the organization, run:

        cf set-org-role <email> <org> OrgAuditor

* If you want to make them an admin for your organization, run:

        cf set-org-role <email> <org> OrgManager

* If you want to give them permission to deploy, add them to each space:

        cf set-space-role <email> <org> <space> SpaceDeveloper

### Remove users

Remove a user from an Org or Space by unsetting their permissions.

* If you want to remove a user from an org:

        cf unset-org-role <email> <org> <role>

* If you want to remove a user from a space:

        cf unset-space-role <email> <org> <space> <role>

For a complete list of cloud.gov roles and permissions see [the Cloud Foundry guide to Org and Space Roles](https://docs.cloudfoundry.org/adminguide/cli-user-management.html#orgs-spaces).
