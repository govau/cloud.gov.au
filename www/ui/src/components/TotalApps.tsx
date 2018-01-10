import * as React from "react";
import styled, { css } from "../styled-components";
import { Flex, Box } from "grid-styled";

import { Vector, isValidVectorNumber, vectorToNumber } from "../vector";

const Strong = styled.strong`
  font-weight: 500;
`;

const PrimaryStrong = styled(Strong)`
  ${({ theme }) =>
    css`
      color: ${theme.primaryColor};
    `};
`;

const Value = styled.div`
  font-size: 3rem;
  font-weight: 500;
`;

const Sign = styled.span`
  font-size: 1.75rem;
  font-weight: 500;
  vertical-align: super;
`;

interface DeltaSignProps {
  value: number;
  className?: string;
}

const DeltaSign: React.StatelessComponent<DeltaSignProps> = ({
  value,
  className
}) => <Sign className={className}>{value >= 0 ? "+" : "-"}</Sign>;

const StyledDeltaSign = styled(DeltaSign)`
  ${({ theme, value }) =>
    value >= 0
      ? css`
          color: ${theme.deltaSignPositiveColor};
        `
      : css`
          color: ${theme.deltaSignNegativeColor};
        `};
`;

const Label = styled.div`
  font-size: 1.25rem;
  font-weight: 300;
`;

const StyledFlex = styled(Flex)`
  ${({ theme }) =>
    css`
      border-top: 1px solid ${theme.borderColor};
    `};
`;

interface TotalBoxProps {
  className?: string;
}

const TotalBox: React.StatelessComponent<TotalBoxProps> = ({
  children,
  className
}) => (
  <Box width={[1, 4 / 16]} p={3} className={className}>
    {children}
  </Box>
);

const StyledTotalBox = styled(TotalBox)``;

interface BoxSeparatorProps {
  className?: string;
}

const BoxSeparator: React.StatelessComponent<BoxSeparatorProps> = ({
  className
}) => (
  <React.Fragment>
    <Box width={[1, 1 / 16]} className={className} />
    <Box width={[1, 1 / 16]} />
  </React.Fragment>
);

const StyledBoxSeparator = styled(BoxSeparator)`
  ${({ theme }) =>
    css`
      border-right: 1px solid ${theme.borderColor};
    `};
`;

interface Props {
  label: string;
  total: Vector;
  totalPrevWeek: Vector;
}

const TotalApps: React.StatelessComponent<Props> = ({
  label,
  total,
  totalPrevWeek
}) => {
  const totalPrevWeekNum = vectorToNumber(totalPrevWeek);
  const delta = vectorToNumber(total) - totalPrevWeekNum;

  const NA = <span title="Data not available">N/A</span>;

  return (
    <StyledFlex wrap={true} mt={3} pt={3}>
      <StyledTotalBox>
        <Value>
          {isValidVectorNumber(total) ? vectorToNumber(total) : "N/A"}
        </Value>
        <Label>
          <PrimaryStrong>{label}</PrimaryStrong> apps
        </Label>
      </StyledTotalBox>
      <StyledBoxSeparator />
      <StyledTotalBox>
        <Value>
          {isValidVectorNumber(totalPrevWeek) ? (
            <React.Fragment>
              <StyledDeltaSign value={delta} />
              {Math.abs(delta)}
            </React.Fragment>
          ) : (
            NA
          )}
        </Value>
        <Label>since last week</Label>
      </StyledTotalBox>
      <StyledBoxSeparator />
      <StyledTotalBox>
        <Value>
          {isValidVectorNumber(totalPrevWeek) ? (
            <React.Fragment>
              <StyledDeltaSign value={delta} />
              {(Math.abs(delta) / totalPrevWeekNum * 100).toFixed(0)}
              <Sign>%</Sign>
            </React.Fragment>
          ) : (
            NA
          )}
        </Value>
        <Label>since last week (%)</Label>
      </StyledTotalBox>
    </StyledFlex>
  );
};

export default TotalApps;
