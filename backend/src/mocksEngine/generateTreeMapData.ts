export const generateTreeMapData = () => {
  return {
    type: "treemap",

    title: "Departments",

    data: [
      {
        name: "Engineering",

        children: [
          {
            name: "Frontend",
            value: 120,
          },
          {
            name: "Backend",
            value: 180,
          },
          {
            name: "DevOps",
            value: 70,
          },
        ],
      },

      {
        name: "Marketing",

        children: [
          {
            name: "SEO",
            value: 90,
          },
          {
            name: "Ads",
            value: 140,
          },
        ],
      },
    ],
  };
};