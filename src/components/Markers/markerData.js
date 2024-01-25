const world = {
  location: "world",
  places: [
    {
      name: "Parador",
      link: "parador",
      type: "continent",
      left: 1350,
      top: 550,
    },
    {
      name: "Gia",
      link: "gia",
      type: "continent",
      left: 2540,
      top: 800,
    },
    {
      name: "Artane Archipeligo",
      link: "artane",
      type: "continent",
      left: 150,
      top: 370,
    },
  ],
};

const paradorContinent = {
  location: "parador",
  places: [
    {
      name: "World View",
      link: "world",
      type: "back button",
      left: 1300,
      top: 100,
    },
    {
      name: "Alliance of Jursel",
      link: "jursel",
      type: "continent",
      left: 780,
      top: 430,
    },
    {
      name: "Seraphis",
      link: "seraphis",
      type: "continent",
      left: 1140,
      top: 800,
    },
  ],
};

const jurselKingdom = {
  location: "jursel",
  places: [
    {
      name: "World View",
      link: "world",
      type: "redirect",
      left: 710,
      top: 150,
    },
    {
      name: "Parador",
      link: "parador",
      type: "redirect",
      left: 710,
      top: 190,
    },
    {
      name: "Dran",
      link: "dran",
      type: "city",
      left: 755,
      top: 433,
    },
    // {
    //   name: "Seraphis",
    //   link: "seraphis",
    //   type: "continent",
    //   left: 1140,
    //   top: 800,
    // },
  ],
};

export const markersData = [world, paradorContinent, jurselKingdom];
