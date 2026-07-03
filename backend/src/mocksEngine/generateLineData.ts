export const generateLineData = () => {
  const data = [];

  for (let i = 1; i <= 12; i++) {
    data.push({
      date: `2026-${String(i).padStart(2, "0")}-01T00:00:00Z`,

      value: Math.floor(
        Math.random() * 1000
      ),
    });
  }

  return {
    type: "line",

    title: "Monthly Revenue",

    data,
  };
};