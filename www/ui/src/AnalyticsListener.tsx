import * as React from "react";
import Helmet from "react-helmet";
import { RouteComponentProps, withRouter } from "react-router";

const gaPropertyID = process.env.REACT_APP_GA_PROPERTY_ID;

interface Props {}

class AnalyticsListener extends React.Component<
  Props & RouteComponentProps<{}>
> {
  // componentDidMount registers the pageview sender on the history object and
  // also triggers the first pageview which corresponds to the initial server
  // page request.
  componentDidMount() {
    this.props.history.listen(this.sendPageview);
    this.sendPageview();
  }

  sendPageview = () => {
    if (!gaPropertyID) {
      return;
    }
    const { location } = this.props;
    // TODO(jonathaningram): delaying this so that the document title has been
    // updated.
    // Need to figure out how best to solve the delay that react-helmet applies.
    // Possibly can use `<Helmet defer={false} />`.
    setTimeout(() => {
      ga("set", "title", Helmet.peek().title);
      ga("set", "page", location.pathname);
      ga("send", "pageview");
    }, 500);
  };

  render() {
    return null;
  }
}

export default withRouter(AnalyticsListener);
