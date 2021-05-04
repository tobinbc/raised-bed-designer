export enum Name {
  Top = "A",
  Right = "B",
  Bottom = "C",
  Left = "D",
}

export const makeValue = (input) =>
  typeof input === "number" ? `${input}%` : undefined;
