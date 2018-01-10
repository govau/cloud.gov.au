abstract: What to do when there’s an incident with your application availability and how we will respond.

## Status and availability reports

We publish status and availability for the platform and applications on:

[status.cloud.gov.au](http://status.cloud.gov.au)

During incidents, we commit to delivering status updates every 15 minutes.

## Your responsibilities

* The availability of your service.
* Running your application.
* The availability of the applications that make up your service.
* Making changes to your service.
* Security and classification of the data stored by your service.
* Sending emails for your service including emails for user sign ups, password resets, and notifications.

## Our responsibilities

* Providing a platform to run services on.
* Providing tools to make changes to those services faster, standard, and safer.
* Ensuring the availability and uptime of the platform, so applications can successfully serve traffic.
* Any backing services provided by the platform that applications depend on (like databases and caching).
* Domain name management, load balancing, and redirection for any applications or services running on the platform.

## Triage and escalation process diagram

![Triage and escalation process flowchart](/support/triage_and_escalation_process.png)

## Escalating incidents

Things are going to break. We're here to help you get back on your feet.

What you should escalate to us:

* A suspected failure of the application runtime environment, that is impacting the availability of your app.
* A suspected failure of a backing service used by your app, provided by the cloud.gov.au platform, that is impacting the availability of your app.

What you not should _not_ escalate to the cloud.gov.au team:

* Failures in your application that are caused by configuration error, or code change. For example, if you apply an update to your service, and the service or a webpage becomes unavailable, you should investigate the root cause in your application layer before asking us.

How to escalate incidents to us:

* Send a support ticket to [support.cloud.gov.au](mailto:support@cloud.gov.au), or
* Send an email to [incidents@cloud.gov.au](mailto:support@cloud.gov.au)

This will post a notification in #cloud-gov-au on Slack and alert the primary on-call for cloud.gov.au, who will triage the incident.

## How to view our incident management

* Join the #incidents channel on Slack – but please refrain from posting in this channel unless you are directly working on the incident.
* We will appoint an Incident Response Commander to run the incident.
* The topic of the #incidents channel will be updated.
* We will provide 15-minutely updates on status.cloud.gov.au.
* We will hold and publish a [Post Incident Review](/support/incident_reports/).
