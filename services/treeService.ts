import Tree from "../models/treeModel";

const mockedData: Tree[] = [
  { amount: 1 },
  { amount: 2 },
  { amount: 3 },
  { amount: 4 },
  { amount: 5 },
  { amount: 6 },
  { amount: 7 },
  { amount: 8 },
  { amount: 9 },
  { amount: 10 },
]

export const getTrees = (): Tree[] => {
  return mockedData;
}
