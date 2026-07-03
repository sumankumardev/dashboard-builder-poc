export const generateScatterData = () => {
  const points = [];

  for (let i = 0; i < 50; i++) {
    points.push([
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
    ]);
  }

  return {
    type: "scatter",

    title: "Student Performance",

    data: points,
  };
};