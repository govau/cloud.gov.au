abstract: How to access your applications’ log output.

To see your application’s log output use:

```
cf logs app_name
```

This will tail the application logs from all application instances, straight to your development workstation's console.

To see logs from the past use:

```
cf logs --recent app_name
```
