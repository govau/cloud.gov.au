import * as React from "react";
import { Location } from "history";
import { RouteComponentProps, withRouter } from "react-router";

const gaPropertyID = process.env.REACT_APP_GA_PROPERTY_ID;

export const sendPageview = (location: Location) => {
  if (!gaPropertyID) {
    return;
  }
  // TODO(jonathaningram): check that the right document title has been sent.
  // Possibly can use `<Helmet defer={false} />`.
  ga("set", "page", location.pathname);
  ga("send", "pageview");
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
