export const setCount = (count: number) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1) + "M"}`;
  }

  if (count < 1000) {
    return "<1K";
  } else if (count >= 5000) {
    return `${Math.round(count / 1000)}K`;
  } else {
    return `${(count / 1000).toFixed(1) + "K"}`;
  }
};
