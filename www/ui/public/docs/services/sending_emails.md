abstract: How to send emails using cloud.gov.au’s smtp service.

cloud.gov.au has a resilient, highly available smtp service.

If your application has been deployed, you can use this service to send outbound emails.

Currently, there is no capability to receive emails.

## Accessing this service

1. Please lodge a request by emailing [support@cloud.gov.au](mailto:support@cloud.gov.au). Make sure you include the email address that all emails will be coming from.
2. We’ll create an account and add your domain (if it hasn’t been already) to the [DKIM](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail) setup and send you the credentials along with some dns TXT records for [SPF](https://en.wikipedia.org/wiki/Sender_Policy_Framework) & DKIM.
3. Please make sure these dns records are adjusted to help your emails get delivered.

## Using the service

You should configure your application to use the following settings:

**Host**: smtp.hasmtp.cld.gov.au
**Port**: 587
**Encryption**: STARTTLS
**AUTH Type**: LOGIN or PLAIN
**AUTH Username**: *whole email address*
**AUTH Pass**: Your password will be sent to you via sms.

### Limitations

There is no access to smtp logging at this stage.

This service is for unclassified use only. No DLM markers will be applied.
