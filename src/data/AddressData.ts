interface LocationData {
  [country: string]: {
    [emirate: string]: {
      [city: string]: {
        [district: string]: {
          roads: string[];
          deliveryCost: number;
        };
      };
    };
  };
}

const Locations: LocationData = {
  Bangladesh: {
    Dhaka: {
      "Dhaka City": {
        Dhanmondi: {
          roads: ["Road 1", "Road 2", "Road 3"],
          deliveryCost: 100,
        },
        Gulshan: {
          roads: ["Gulshan 1", "Gulshan 2"],
          deliveryCost: 70,
        },
      },
    },
  },
} as const;

export default Locations;
