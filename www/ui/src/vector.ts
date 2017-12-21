interface Metric {
  [key: string]: string;
}

export interface Sample {
  metric: Metric;
  value: [number, string];
}

export interface Vector extends Array<Sample> {}

export const vectorToNumber = (vector: Vector): number => {
  if (vector.length !== 1) {
    return 0;
  }
  const { value: values } = vector[0];
  if (values.length !== 2) {
    return 0;
  }
  return Number(values[1]);
};
