import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import Helmet from "react-helmet";
import styled from "../styled-components";
import { Flex, Box } from "grid-styled";
import marksy from "marksy";
import yaml from "yamljs";

import NotFoundPage from "./NotFoundPage";

const compile = marksy({
  createElement: React.createElement
});

const defaultErrorMessage = "An error occurred.";

const Wrapper = styled.div`
  text-align: center;
`;

interface Props extends RouteComponentProps<{}> {}

interface State {
  isFetching: boolean;
  notFound: boolean;
  error: any;
  content: string;
  config: any;
}

class MarkdownPage extends React.Component<Props, Partial<State>> {
  state: Partial<State> = {};

  componentDidMount() {
    this.loadConfig();
    this.load();
  }

  componentWillReceiveProps() {
    this.loadConfig();
    this.load();
  }

  // TODO(jonathaningram): load config elsewhere, or at least don't clobber the
  // state between this method and load.
  async loadConfig() {
    this.setState(() => ({ isFetching: true, notFound: false, error: null }));

    try {
      const resp = await fetch("/config.yml", {
        credentials: "same-origin"
      });
      if (resp.status > 399) {
        this.setState(() => ({ error: defaultErrorMessage }));
        return;
      }
      const text = await resp.text();
      const config = yaml.parse(text);

      this.setState(() => ({ config }));
    } catch (e) {
      console.error(e);
      this.setState(() => ({ error: e.message || defaultErrorMessage }));
    } finally {
      this.setState(() => ({ isFetching: false }));
    }
  }

  async doLoad(path: string) {
    this.setState(() => ({ isFetching: true, notFound: false, error: null }));

    // TODO(jonathaningram): we have to fetch this for now.
    // In the future CRA might let us import the raw content of MD files.
    // See https://github.com/facebookincubator/create-react-app/issues/3722
    try {
      const resp = await fetch(
        `${process.env.REACT_APP_MD_ENDPOINT || ""}${path}`,
        {
          credentials: "same-origin"
        }
      );
      return resp;
    } catch (e) {
      console.error(e);
      this.setState(() => ({ error: e.message || defaultErrorMessage }));
    } finally {
      this.setState(() => ({ isFetching: false }));
    }
    return null;
  }

  async load() {
    const { url } = this.props.match;
    const path = url.replace(/^\/+|\/+$/g, "");

    if (path.endsWith("index")) {
      this.props.history.push(
        `/${path.substring(0, path.length - "index".length)}`
      );
      return;
    }

    let resp = await this.doLoad(`/${path}.md`);
    if (!resp) {
      return;
    }
    if (resp.status === 404) {
      resp = await this.doLoad(`/${path}/index.md`);
      if (!resp) {
        return;
      }
      if (resp.status === 404) {
        this.setState(() => ({ notFound: true }));
        return;
      }
    }
    const text = await resp.text();

    this.setState(() => ({
      content: text
    }));
  }

  render() {
    const { isFetching, notFound, error, content, config } = this.state;

    if (isFetching) {
      return (
        <Wrapper>
          <Flex wrap={true}>
            <Box width={[1]} p={3}>
              <div>Loading...</div>
            </Box>
          </Flex>
        </Wrapper>
      );
    }

    if (notFound) {
      return <NotFoundPage />;
    }

    if (error) {
      return (
        <React.Fragment>
          <h2>Could not load page</h2>
          {error === defaultErrorMessage ? (
            <p>That's all we know.</p>
          ) : (
            <React.Fragment>
              <p>What we know:</p>
              <pre>{JSON.stringify(error)}</pre>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }

    if (!content) {
      return null;
    }

    const meta: { [key: string]: string } = {
      title: "",
      abstract: ""
    };

    const parsedContent = content
      .split("\n")
      .map(line => {
        for (const field in meta) {
          const idx = line.indexOf(`${field}:`);
          if (idx !== -1) {
            meta[field] = line.substring(idx + `${field}:`.length).trim();
            return false;
          }
        }
        return line;
      })
      .filter(Boolean)
      .join("\n");

    return (
      <React.Fragment>
        {meta.title ? (
          <Helmet>
            <title>{meta.title}</title>
          </Helmet>
        ) : null}
        <Flex wrap={true}>
          <Box width={[1, 3 / 4]} p={1}>
            {meta.title ? <h1>{meta.title}</h1> : null}
            {meta.abstract ? (
              <React.Fragment>
                <p>{meta.abstract}</p>
                <hr />
              </React.Fragment>
            ) : null}
            {parsedContent ? compile(parsedContent).tree : null}
          </Box>
          <Box width={[1, 1 / 4]} p={1}>
            {config &&
              config.pages.map(
                (item: { [key: string]: Array<{ [key: string]: string }> }) => {
                  let title = "";
                  const items = [];
                  for (const k in item) {
                    title = k;
                    items.push(...item[k]);
                  }
                  return (
                    <li key={title}>
                      <h3>{title}</h3>
                      <ul>
                        {items.map((item: { [key: string]: string }) => {
                          let label = "";
                          let value = "";
                          for (const k in item) {
                            label = k;
                            value = item[k];
                          }
                          return (
                            <li key={label}>
                              <a href={`/docs/${value.replace(".md", "")}`}>
                                {label}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                }
              )}
          </Box>
        </Flex>
      </React.Fragment>
    );
  }
}

export default withRouter(MarkdownPage);
