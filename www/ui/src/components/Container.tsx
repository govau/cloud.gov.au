import * as React from "react";
import styled from "../styled-components";
import { Box } from "grid-styled";

const px = (n: number | string) => (typeof n === "number" ? n + "px" : n);

interface Props {
  className?: string;
  maxWidth?: number | string;
  mx?: string;
  px?: number;
}

const UnstyledContainer: React.StatelessComponent<Props> = ({
  children,
  className,
  mx = "auto",
  px = 2
}) => (
  <Box mx={mx} px={px} className={className}>
    {children}
  </Box>
);

const Container = styled(UnstyledContainer)`
  max-width: ${({ maxWidth = 1024 }) => px(maxWidth)};
`;

export default Container;
