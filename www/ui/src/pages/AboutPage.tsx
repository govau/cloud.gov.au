import * as React from "react";
import Helmet from "react-helmet";

interface Props {}

const AboutPage: React.StatelessComponent<Props> = () => (
  <React.Fragment>
    <Helmet>
      <title>About</title>
    </Helmet>
    <h2>About cloud.gov.au</h2>
    <p>This page is a placeholder.</p>
  </React.Fragment>
);

export default AboutPage;
