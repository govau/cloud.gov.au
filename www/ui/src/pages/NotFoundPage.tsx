import * as React from "react";

interface Props {}

const NotFoundPage: React.StatelessComponent<Props> = () => (
  <React.Fragment>
    <h2>Page not found</h2>
    <p>That's all we know.</p>
  </React.Fragment>
);

export default NotFoundPage;
