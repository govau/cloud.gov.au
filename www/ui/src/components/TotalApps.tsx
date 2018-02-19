import * as React from "react";
import styled, { css } from "../styled-components";
import { Flex } from "grid-styled";

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

const Total = styled.div`
  font-size: 3.5rem;
  font-weight: 400;
`;

const Sign = styled.span`
  margin-right: 0.5rem;
  font-weight: 500;
`;

interface DeltaSignProps {
  value: number;
  className?: string;
}

const DeltaSign: React.StatelessComponent<DeltaSignProps> = ({
  value,
  className
}) => (
  <Sign className={className} aria-label={value >= 0 ? "Up" : "Down"}>
    {value >= 0 ? "↑" : "↓"}
  </Sign>
);

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
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 300;
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
    <Flex py={[1, 2]} flexWrap="wrap">
      <div>
        <Total>{isValidVectorNumber(total) ? vectorToNumber(total) : NA}</Total>
        <Label>
          <PrimaryStrong>{label}</PrimaryStrong> app{isValidVectorNumber(
            total
          ) && vectorToNumber(total) > 1
            ? "s"
            : ""}
        </Label>
        {isValidVectorNumber(totalPrevWeek) ? (
          <Label>
            <StyledDeltaSign value={delta} />
            {Math.abs(delta)} app{Math.abs(delta) === 1 ? "" : "s"} since last
            week ({(Math.abs(delta) / totalPrevWeekNum * 100).toFixed(0)}%)
          </Label>
        ) : null}
      </div>
    </Flex>
  );
};

export default TotalApps;
