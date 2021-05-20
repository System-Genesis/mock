import utils from "../utils/utils";

export default {
  all: (query: object) => {
    let data = utils.readJson("./mockFiles/akaEmp.json");
    if (query) data = utils.filterData(data, query);
    return data;
  },

  byPersonalNumber: (personalNumber: string) => {
    const data = utils.readJson("./mockFiles/akaEmp.json");
    return utils.findInData(data, { mi: personalNumber });
  },

  byIdentityCard: (identityCard: string) => {
    const data = utils.readJson("./mockFiles/akaEmp.json");
    return utils.findInData(data, { tz: identityCard });
  },
};
