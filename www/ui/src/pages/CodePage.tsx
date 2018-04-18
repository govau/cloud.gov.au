import * as React from "react";
import Helmet from "react-helmet";
import styled, { css } from "../styled-components";
import { Flex, Box } from "grid-styled";
import format from "date-fns/format";

import Link from "../components/Link";

const defaultErrorMessage = "An error occurred.";

const Wrapper = styled.div`
  width: 100%;
`;

const Heading = styled.h1`
  font-weight: 400;
  font-size: 2rem;
`;

const RepositoryWrapper = styled.div`
  border-top: 1px solid #cccccc;
`;

const LanguageIcon = styled.span`
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 0.25rem;
  ${({ theme }) =>
    css`
      background-color: ${theme.code.language.defaultColor};
    `};
`;

const languageIcons: { [key: string]: any } = {
  Go: LanguageIcon.extend`
    ${({ theme }) =>
      css`
        background-color: ${theme.code.language.goColor};
      `};
  `,
  JavaScript: LanguageIcon.extend`
    ${({ theme }) =>
      css`
        background-color: ${theme.code.language.jsColor};
      `};
  `
};

const Language = styled.span``;

const Meta = styled.span`
  color: #666666;
  font-size: 0.875rem;
`;

const licenseOther = "other";

interface License {
  key: string;
  name: string;
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  pushed_at: string;
  language: string;
  license?: License;
}

interface Response {
  total_count: number;
  items: Array<Repository>;
}

interface State {
  isFetching: boolean;
  error: any;
  response: Response;
}

class CodePage extends React.Component<{}, Partial<State>> {
  state: Partial<State> = {};

  componentDidMount() {
    this.load();
  }

  async load() {
    this.setState(() => ({ isFetching: true, error: null }));

    try {
      const resp = await fetch(`/api/github-repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      });
      const body = await resp.json();
      this.setState(() => ({
        response: body
      }));
    } catch (e) {
      console.error(e);
      this.setState(() => ({ error: e.message || defaultErrorMessage }));
    } finally {
      this.setState(() => ({ isFetching: false }));
    }
  }

  render() {
    const { isFetching, error, response } = this.state;

    const helmet = (
      <Helmet>
        <title>Code</title>
      </Helmet>
    );

    if (isFetching) {
      return (
        <Wrapper>
          {helmet}
          <Box width={[1]} py={3}>
            <div>Loading...</div>
          </Box>
        </Wrapper>
      );
    }

    if (error) {
      return (
        <React.Fragment>
          {helmet}
          <Heading>Could not load</Heading>
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

    if (!response) {
      return null;
    }

    return (
      <Wrapper>
        {helmet}
        <Heading>Code by cloud.gov.au</Heading>
        {response.items.length > 0 ? (
          <p>
            {response.total_count} result{response.items.length === 1
              ? ""
              : "s"}
          </p>
        ) : (
          <p>No code at the moment.</p>
        )}
        {response.items.map(r => {
          const LangIcon =
            r.language && languageIcons[r.language]
              ? languageIcons[r.language]
              : LanguageIcon;

          return (
            <RepositoryWrapper key={r.id}>
              <Flex py={3}>
                <Box w={["100%", "75%"]}>
                  <Flex>
                    <Box w={[1, 3 / 4]}>
                      <Link href={`https://github.com/${r.full_name}`}>
                        <strong>{r.full_name}</strong>
                      </Link>
                    </Box>
                    <Box w={[1, 1 / 4]}>
                      <Flex wrap={true} align="center">
                        <LangIcon />
                        <Language>{r.language}</Language>
                      </Flex>
                    </Box>
                  </Flex>
                  {r.description ? (
                    <Flex my={2}>
                      <Box w={[1, 1 / 2]}>{r.description}</Box>
                    </Flex>
                  ) : null}
                  {(r.license &&
                    r.license.name &&
                    r.license.key !== licenseOther) ||
                  r.pushed_at ? (
                    <Flex my={2}>
                      {r.license &&
                      r.license.name &&
                      r.license.key !== licenseOther ? (
                        <Box mr={2}>
                          <Meta>{r.license.name}</Meta>
                        </Box>
                      ) : null}
                      <Box>
                        <Meta>
                          Updated on {format(r.pushed_at, "D MMM YYYY")}
                        </Meta>
                      </Box>
                    </Flex>
                  ) : null}
                </Box>
              </Flex>
            </RepositoryWrapper>
          );
        })}
      </Wrapper>
    );
  }
}

export default CodePage;
