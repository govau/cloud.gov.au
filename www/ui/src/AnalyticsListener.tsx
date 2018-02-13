import * as React from "react";
import { Location } from "history";
import Helmet from "react-helmet";
import { RouteComponentProps, withRouter } from "react-router";

const gaPropertyID = process.env.REACT_APP_GA_PROPERTY_ID;

export const sendPageview = (location: Location) => {
  if (!gaPropertyID) {
    return;
  }
  // TODO(jonathaningram): delaying this so that the document title has been
  // updated.
  // Need to figure out how best to solve the delay that react-helmet applies.
  // Possibly can use `<Helmet defer={false} />`.
  setTimeout(() => {
    ga("set", "title", Helmet.peek().title || "cloud.gov.au");
    ga("set", "page", location.pathname);
    ga("send", "pageview");
  }, 500);
};

interface Props extends RouteComponentProps<{}> {}

class AnalyticsListener extends React.Component<Props> {
  // componentDidMount triggers the first pageview which corresponds to the
  // initial server page request.
  componentDidMount() {
    sendPageview(this.props.location);
  }

  render() {
    return null;
  }
}

export default withRouter<Props>(AnalyticsListener);
