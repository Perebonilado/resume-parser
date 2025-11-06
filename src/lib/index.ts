import { milliSecondToSecondConversionRate } from "@/constants";

export const convertMegaBytesToBytes = (byte: number): number => {
  const conversationRate = 1024;
  return byte * Math.pow(conversationRate, 2);
};

export const getFileNameWithoutExtension = (name: string) => {
  return name.substring(0, name.lastIndexOf(".")) || name;
};

export const secondsToMilliSeconds = (seconds: number): number => {
  return seconds * milliSecondToSecondConversionRate;
};
