import gen from "../gen/gen";
import utils from "../utils";

export const filterData = (data: object[], query: object) => {
  const filteredData = data.filter((record) => {
    for (const key in query) {
      if (!record[key] || !record[key].toString().includes(query[key])) {
        return false;
      }
    }

    return true;
  });

  return filteredData;
};

export default {
  generate: async () => {
    await gen();
    return "<h1>New data has been successfully generated</h1>";
  },

  eightSocks: (query: object) => {
    let data: object[] = utils.readJson("./mockFiles/eightSocks.json");

    if (query) data = filterData(data, query);

    return data;
  },

  akaEmployees: (query: object) => {
    let data = utils.readJson("./mockFiles/getAkaEmp.json");

    if (query) data = filterData(data, query);

    return data;
  },

  aDs: (query: object) => {
    let data = utils.readJson("./mockFiles/AD.json");

    if (query) data = filterData(data, query);

    return data;
  },

  aDNN: (query: object) => {
    let data = utils.readJson("./mockFiles/AD.json");

    if (query) data = filterData(data, query);

    return data;
  },

  city: (query: object) => {
    let data = utils.readJson("./mockFiles/city.json");

    if (query) data = filterData(data, query);

    return data;
  },

  sf: (query: object) => {
    let data = utils.readJson("./mockFiles/sf.json");

    if (query) data = filterData(data, query);

    return data;
  },
};
