## ORCA - Operations Readiness Checklist of Amazement

![whale whale whale, what have we got here?](http://i.imgur.com/Brl42KH.jpg)

Status: _DRAFT_
Last Updated: 5 September 2016

cloud.gov.au is a best of breed hosting platform for applications written to the [Digital Service Standard](https://www.dta.gov.au/standard/).

This list represents a distillation of questions and issues encountered by service delivery teams as building applications on cloud.gov.au.

Some of these questions, like which URL or domain name your application will be hosted at, should be resolved early in the inception of your transformation project.
Other questions should be revisited as part of the regular assessment of your project.

### Moratorium
A [Moratorium](https://www.dta.gov.au/standard/moratorium/) on service investment is in place to limit the fragmentation of the user experience of Australian Government services. However, investments are automatically exempt if the service delivery team can demonstrate they are applying the Digital Service Standard.

Consult with your agency's Digital Transformation Coordinator or the Digital Transformation Agency for further information.

### What is the URL your application will be served from?
**Assessment criteria:** onboarding
**DSS Criteria:** 4

Your application or service will most likely have a web presence.
You will need to choose a URL at which your application will be hosted.
Choosing a URL is an important decision that touches many departments, and, because of the way HTTP cookies work, has security implications.

You should seek advice on, and choose, a URL early in the life of your project to allow for lead times for arrangements to be made to host your application.

### What domain names do you need registered to host your application?
**Assessment criteria:** onboarding
**DSS Criteria:** 4

To use a dedicated domain, consult with your agency CIO / IT Manager / Web Manager to determine if this an appropropriate solution and to arrange for an application for a new domain to be submitted. Note that applications should be accompanied by a stated purpose outlining why a new domain, separate from an existing agency/topic domain, is required to support the initiative, and demonstrating compliance with the [gov.au Eligibility and Allocation Policy](http://www.domainname.gov.au/domain-policies/eligibility-and-allocation-policy/).

Due to the way SSL certificates work, each new domain name carries with it a cost to purchase and maintain an SSL certificate for the life of your project.

As with the choice of URL, you should decide on your domain name early in your project timeline.

Please contact the [Domain Provider for your jurisdiction](http://www.domainname.gov.au/contact-us/) if you need any further information.

#### Subdomain options

To use a subdomain of an existing agency/topic domain, consult with the [Registrant contact](http://whois.ausregistry.net.au/whois/whois_local.jsp?) of the intended domain to determine if this an appropropriate solution and to arrange its creation in the DNS zone file.

### Is your application built in Ruby, Python, Node, Java, or Go?
**Assessment criteria:** onboarding
**DSS Criteria:** 4

Cloud Foundry, the hosting technology that underpins cloud.gov.au, supports the following languages:

- Ruby
- Python
- Node
- Java
- Go

If you are planning to write your application in a language that is not on this list you should discuss this with the cloud.gov.au team by sending a support request to support@cloud.gov.au.
Please understand that the choice of languages is limited because each supported language represents a significant investment of resources to maintain, support, and patch bugs and security issues.
Adding a new supported language is not something taken lightly by the cloud.gov.au team as this represents an ongoing commitment for the life of all projects delivered in that language.

Depending on your answer to this question, the following questions may be appropriate:

#### If Java, do you use SpringBoot, Play, or Grails?

The Java ecosystem contains many ways to write and deploy applications, not all of which are supported.
If your Java application will not use one of the following:

- SpringBoot
- Play
- Grails

Before proceeding, you should discuss your requirements with cloud.gov.au by sending a support request to support@cloud.gov.au.

#### If Ruby, do you use Rails or Sinatra?

The Ruby ecosystem contains many ways to write and deploy applications, not all of which are supported.
If your Ruby application will not use one of the following:

- Rails
- Sinatra

Before proceeding, you should discuss your requirements with cloud.gov.au by sending a support request to support@cloud.gov.au.

#### If Python, do you use Django or Flask?

The Python ecosystem contains many ways to write and deploy applications, not all of which are supported.
If your Python application will not use one of the following:

- Django
- Flask

Before proceeding, you should discuss your requirements with cloud.gov.au by sending a support request to support@cloud.gov.au.

### What automated software testing do you do?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 10

Automated testing is an important part of the Digital Service Standard.
You should consider how you will build automated tests for all parts of your application, what external resources you may need, including scratch or mock items like databases and message queues, and how you will populate those with test data.

### Will your application send email?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4, 5

Sending email from a government application is complicated.
For example, some types of email correspondence, like account creation or password reset notifications, represent a potential security risk as the contents of email are not considered private.

What address or addresses do you plan to be the _sender_ of an email from your application?
All email has a sender, and recipients of the email from your system will attempt to reply to it.
You should consider how you will handle ad-hoc replies to automated messages.

### Will your application receive email?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4, 5

Receiving email is also complicated as the correspondence may need to be archived.

Does you application need to process incoming email?
If so, how much, and how long does it need to be stored?

### What one off or recurring tasks does your application need to run?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4

Will your application need to run recurrent or batch jobs?
These might be one off tasks to perform a database migration, or periodic tasks.

If yes, how will you monitor these tasks' status?

### Who will have access to your application during its private beta phase?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4, 9, 10

When building a digital service it is common to do a beta release to a limited number of beta users.

- Who will have access to your application during your private beta?
- How will you grant them access?
- How will you implement this access?
- How will you revoke their access if they are removed from the beta program?
- How will you audit the use of your application while in private beta?

### Who will have access to your application during its public beta phase?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4, 9, 10

When building a digital service it is common to move from a private beta phase to a limited public beta.

- If you plan to restrict access to your application during your public beta, who should have access to your application?
- How will you grant them access?
- How will you implement this access?
- How will you revoke their access if they are removed from the beta program?
- Do you need to audit the use of your application while in public beta, and if so now?

### How are users authenticated?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4, 5

Authentication is a critical element of the security of your application.

#### Do you plan to implement multi factor authentication?

Multi factor authentication, sometimes called two factor authentication, is an additional security measure above traditional usernames and passwords by combining something you know (username, password), with something you have (usually a one time code)

Depending on the security requirements of your application you may need to consider implementing multi factor authentication for some or all of the actions that require authorisation.

### How many users will be using this service at peak?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4, 10, 11

Having a firm estimate of the number of concurrent users is crucial to designing your application to perform well under peak loads and to ensure sufficient resources are available to meet peak demand.

- How many users do you expect to use your service?
- What is the peak number of users do you expect to use your service at one time?

### What is the maximum number of requests per second to your web tier do you expect to receive?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4, 10, 11

Most applications will generate many HTTP requests per user action.

- How many HTTP requests per second do you expect your application to receive?
- If you application provides an API, how will you rate limit aggressive clients of your service?
- What is the maximum acceptable processing time for a HTTP request?
- Do some requests take longer than others? If so, how will you identify them?

### Is your data classified at UNCLASSIFIED or PROTECTED?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 5

cloud.gov.au is able to handle data classified at UNCLASSIFIED level.
If your application will handle PROTECTED data this will require provisioning of resources in a data center with a higher security rating.
This process has a long lead time.

Before proceeding, you should discuss your requirements with cloud.gov.au by sending a support request to support@cloud.gov.au.

### How do you log what users accessed what resources?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 5

If you application contains resources that are protected, you should record who accessed what, and when, for audit purposes.
You may be required to archive these audit logs.

### What external systems are you interfacing with?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4

If your application relies on other systems to deliver its service, what are they and how are they accessed?
Components like databases and message queues deployed specifically for your application are usually excluded from this list.

#### How will you communicate the availability of those external systems to your users?
If an external system that your application needs to perform its work is performing slowly or is unavailable, how will you inform your users of this?

#### Do these external systems require credentials?
If those external systems require credentials or other security tokens for authentication, how will those credentials be protected and managed by your application?

### Do you use MySQL or PostgreSQL for your database?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4

cloud.gov.au supports the following databases:

- MySQL
- PostgresSQL

If you are planning to use a database that is not on this list you should discuss this with the cloud.gov.au team by sending a support request to support@cloud.gov.au.

#### How much data do you plan to store in your database?

### Do you use RabbitMQ for queuing?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4

cloud.gov.au supports the following message queues:

- RabbitMQ

If you are planning to use a message queue that is not on this list you should discuss this with the cloud.gov.au team by sending a support request to support@cloud.gov.au.

#### How much data do you plan to store in your queue?

### Do you use memcache or Redis for caching?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4

cloud.gov.au supports the following caching products:

- memcache
- Redis

If you are planning to use a cache that is not on this list you should discuss this with the cloud.gov.au team by sending a support request to support@cloud.gov.au.

#### How much data do you plan to store in your cache?

### Are users able to upload files? Where will you store them?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4

If your application allows users to upload files, where do you plan to store this data, and how much of it will there be?

### What is the uptime requirement of your application?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4

What is the uptime requirement for your application?

### What failure conditions in your application are considered an outage?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 4

Applications should be written to degrade gracefully under load or when a failure occurs.

- What failure conditions can your application handle without intervention?
- What failure conditions can your application handle by temporarily disabling a feature or function?
- What failure conditions in your application will require someone to be notified to fix it?

### How will you continue to provide your service during an outage?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 10

Depending on the length of your outage, unplanned or otherwise, you may have to revert to an alternative or manual process.
How will that work?

### How will you communicate availability status to your users?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 3, 4

Most services experience some level of downtime, either scheduled or unplanned.
How will you communicate scheduled or unplanned downtime to your users?

### How will your users contact you for support?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 3

If you users need to contact you with a support request, how will they do so?

### How will your users provide feedback to you for your application?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 3

If you users wish to provide you with feedback, how will they do so?

### Where is your source code hosted?
**Assessment criteria:** onboarding and continued
**DSS Criteria:** 8

Will the source code to your application be publicly available under an appropriate Open Source licence.
If not, where do you plan to host your source code?
