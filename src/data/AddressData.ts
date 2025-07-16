// src/constants/bangladeshLocations.ts

const Locations = {
  Bangladesh: {
    Dhaka: {
      "Dhaka City": {
        Dhanmondi: ["Road 1", "Road 2", "Road 3"],
        Gulshan: ["Gulshan 1", "Gulshan 2"],
        Banani: ["Banani Block A", "Banani Block B"]
      },
      Narayanganj: {
        Fatullah: ["Chashara", "Kadam Rasul"],
        Siddhirganj: ["Adamjee", "Mizmizi"]
      }
    },
    Chattogram: {
      "Chattogram City": {
        Agrabad: ["Road A", "Road B"],
        Panchlaish: ["Block A", "Block B"]
      },
      CoxsBazar: {
        Sadar: ["Sugandha Beach", "Laboni Beach"],
        Ukhiya: ["Kutupalong", "Balukhali"]
      }
    },
    Rajshahi: {
      RajshahiCity: {
        Boalia: ["Shaheb Bazar", "Laxmipur"],
        Rajpara: ["Bhadra", "Hetemkha"]
      },
      Naogaon: {
        Sadar: ["Naogaon Town", "Chowdhury Para"],
        Manda: ["Krishnagar", "Shibrampur"]
      }
    },
    Khulna: {
      KhulnaCity: {
        Sonadanga: ["Majid Sarani", "KDA Avenue"],
        Khalishpur: ["BIDC Road", "Boyra"]
      },
      Bagerhat: {
        Sadar: ["Sundarghona", "Railgate"],
        Mongla: ["Port Area", "Digraj"]
      }
    }
  }
} as const;

export default Locations;
