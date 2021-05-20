import utils from "../utils/utils";

export default {
  all: (query: object) => {
    let data = utils.readJson("./mockFiles/sf.json");
    if (query) data = utils.filterData(data, query);
    return data;
  },
  byPersonalNumber: (personalNumber: string) => {
    const data = utils.readJson("./mockFiles/sf.json");
    return utils.findInData(data, { personalNumber });
  },
  byIdentityCard: (identityCard: string) => {
    const data = utils.readJson("./mockFiles/sf.json");
    return utils.findInData(data, { tz: identityCard });
  },
};
