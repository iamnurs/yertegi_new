const pad = (n, width, z = 0) => {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z.toString()) + n;
};

const minutesAndSeconds = position => [
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2)
];

export { minutesAndSeconds };
