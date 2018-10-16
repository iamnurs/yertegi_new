const secondsToTime = (time: number): string => {
  return new Date(time * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
};

export { secondsToTime };
