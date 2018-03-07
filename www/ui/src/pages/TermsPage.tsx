import * as React from "react";
import Helmet from "react-helmet";

interface Props {}

const TermsPage: React.StatelessComponent<Props> = () => (
  <React.Fragment>
    <Helmet>
      <title>Terms of service</title>
    </Helmet>
    <h1>Terms of service</h1>
    <p>Work in progress.</p>
  </React.Fragment>
);

export default TermsPage;
