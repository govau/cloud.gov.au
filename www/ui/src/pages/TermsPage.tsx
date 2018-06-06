import * as React from "react";
import Helmet from "react-helmet";

interface Props {}

const TermsPage: React.StatelessComponent<Props> = () => (
  <React.Fragment>
    <Helmet>
      <title>Terms of service</title>
    </Helmet>
    <h1>Terms of service</h1>
    <h2>Definitions</h2>
    <p>
      <strong>You</strong> and <strong>Your</strong> means any user deploying
      applications on cloud.gov.au.
    </p>
    <p>
      <strong>Our</strong>, <strong>Us</strong> and <strong>We</strong> means
      the providers of the cloud.gov.au platform managed by the Digital
      Transformation Agency.
    </p>
    <p>
      <strong>cloud.gov.au</strong> means the cloud foundry platform and
      associated applications, api endpoints, and services (such as databases)
      that we provide, including:
    </p>
    <ul>
      <li>api.system.*.cld.gov.au</li>
      <li>console.system.*.cld.gov.au</li>
      <li>grafana.system.*.cld.gov.au</li>
      <li>logs.*.cld.gov.au</li>
    </ul>
    <p>
      <strong>Applications you deploy</strong> means application code you run on
      cloud.gov.au, such as code deployed with the `cf push` command.
    </p>
    <h2>General</h2>
    <p>
      cloud.gov.au is managed by the Digital Transformation Agency. Your use of
      cloud.gov.au is deemed to be your acceptance of these Terms of Use. Please
      read them carefully.
    </p>
    <p>
      These terms of use are governed by the laws of the Australian Capital
      Territory, Australia and you agree to submit to the exclusive jurisdiction
      of the courts of the Australian Capital Territory.
    </p>
    <p>
      If any of these terms of use are held to be invalid, unenforceable or
      illegal for any reason, the remaining terms of use will continue in full
      force.
    </p>
    <p>
      These terms of use do not negate any terms or conditions that apply to
      your use of any other government service.
    </p>
    <p>
      You must comply with the AWS{" "}
      <a href="https://aws.amazon.com/aup">
        Acceptable Usage Policy
      </a>.
    </p>
    <p>
      You must comply with the APS{" "}
      <a href="https://www.apsc.gov.au/working-in-the-aps/your-rights-and-responsibilities-as-an-aps-employee/code-of-conduct">
        Code of Conduct
      </a>.
    </p>
    <p>
      We reserve the right to terminate applications, and revoke access if these
      terms and conditions are not met.
    </p>
    <p>
      We may revise these terms and conditions from time to time. We will notify
      you in writing of any changes.
    </p>
    <p>
      Please contact us if you have any questions, problems or feedback
      regarding the terms of use.
    </p>
    <h2>Lawful purposes</h2>
    <p>
      You agree to use cloud.gov.au only for lawful purposes, and in a manner
      that does not infringe the rights of or restrict or inhibit the use and
      enjoyment of cloud.gov.au by any third party. This includes conduct which
      is unlawful or which may harass or cause distress or inconvenience to any
      person, the transmission of obscene or offensive content or disruption to
      cloud.gov.au.
    </p>
    <p>
      You must not post or transmit via cloud.gov.au any unlawful, defamatory,
      obscene, offensive or scandalous material, or any material that
      constitutes or encourages conduct that would contravene any law.
    </p>
    <h2>Responsibilities</h2>
    <p>
      We are responsible for maintaining the availability, and security of the
      platform and services (such as databases) that are provided to you.
    </p>
    <p>
      You are responsible for maintaining the availability, security, and
      performance of your applications deployed to cloud.gov.au.
    </p>
    <h2>Disclaimer</h2>
    <p>Your use of cloud.gov.au does not affect or reduce any obligation owed to you by any Agency, or reduce any obligation you owe to any Agency.</p>
    <p>
      The documentation on cloud.gov.au is not a substitute for independent
      professional advice and you should obtain any appropriate professional
      advice relevant to your particular circumstances. You must exercise your
      own judgement and carefully evaluate the material on cloud.gov.au.
    </p>
    <h2>Security</h2>
    <p>We are responsible for the security of information.</p>
    <p>
      We are committed to protecting the information you provide on
      cloud.gov.au. We will use all reasonable endeavours to ensure that
      cloud.gov.au and your information are not compromised. In line with the
      DTA’s{" "}
      <a href="https://www.dta.gov.au/what-we-do/policies-and-programs/secure-cloud/">
        Secure Cloud Strategy
      </a>, we recommend you take a risk-based approach to ensure the security
      of your applications deployed on cloud.gov.au.
    </p>
    <p>
      We recommend that you keep your developer workstations up-to-date with
      security patching.
    </p>
    <p>
      You must conduct your own application pen-testing, but must get approval
      from cloud.gov.au beforehand.
    </p>
    <p>
      You are responsible for security of the applications you deploy on
      cloud.gov.au, which includes but is not limited to DoS protection,
      patching library vulnerabilities, and fixing application code
      vulnerabilities.
    </p>
    <h2>Privacy</h2>
    <p>
      For more information about how we protect your privacy and personal
      information, please see our{" "}
      <a href="https://www.dta.gov.au/privacy-statement/">privacy policy</a>.
    </p>
    <p>
      We do not share information about you with other government agencies
      without your permission unless it:
    </p>
    <ul>
      <li>
        is necessary to provide you with a service that you have requested
      </li>
      <li>is required or authorised by law</li>
      <li>
        will prevent or lessen a serious and imminent threat to somebody's
        health
      </li>
    </ul>
    <p>
      Users are responsible for undertaking their own security and privacy
      assessments for their applications and data.
    </p>
  </React.Fragment>
);

export default TermsPage;
