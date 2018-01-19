import * as React from "react";
import styled from "../styled-components";
import { ResponsiveLine } from "@nivo/line";

import { theme } from "../theme";
import { Vector, Sample } from "../vector";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const Wrapper = styled.div`
  height: 250px;
  svg > g > g > g:first-child > g > g:not(:first-child):not(:last-child) {
    display: none;
  }
  svg > g > g > g:first-child > g > g:first-child {
    transform: translate(1rem);
  }
`;

const sortFn = (a: Sample, b: Sample): number => {
  return Number(a.value[0]) - Number(b.value[0]);
};

interface Series {
  id: string;
  color: string;
  data: Vector;
}

interface Props {
  label: string;
  data: Vector;
}

const DeploymentsChart: React.StatelessComponent<Props> = ({ label, data }) => {
  const max = data
    .map((s: Sample) => Number(s.value[1]))
    .reduce(
      (a: number, b: number, i: number, arr: number[]) => Math.max(a, b),
      0
    );

  return (
    <Wrapper>
      <ResponsiveLine
        data={[
          {
            id: `${label} deployments`,
            color: theme.primaryColor,
            data: data.sort(sortFn).map((s: Sample) => {
              const t = new Date(s.value[0] * 1e3);
              return {
                x: `${months[t.getMonth()]} ${t.getDate()}`,
                y: Number(s.value[1])
              };
            })
          }
        ]}
        margin={{
          top: 50,
          right: 25,
          bottom: 50,
          left: 35
        }}
        colorBy={(s: Series) => s.color}
        enableDots={false}
        dotSize={8}
        dotColor="#ffffff"
        dotBorderWidth={2}
        enableArea={true}
        animate={true}
        enableGridX={false}
        enableGridY={false}
        curve="monotoneX"
        axisBottom={{
          legend: "app deployments per day",
          legendOffset: 36,
          legendPosition: "center",
          tickSize: 0,
          tickPadding: 5
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 15,
          tickValues: [0, max]
        }}
      />
    </Wrapper>
  );
};

export default DeploymentsChart;
