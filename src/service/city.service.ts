import utils from "../utils";

export default {
  all: (query: object) => {
    let data = utils.readJson("./mockFiles/city.json");
    if (query) data = utils.filterData(data, query);
    return data;
  },
  byPersonalNumber: (personalNumber: string) => {
    const data = utils.readJson("./mockFiles/city.json");
    return utils.findInData(data, { personalNumber });
  },
  byDomainUser: (domainUser: string) => {
    const data = utils.readJson("./mockFiles/city.json");
    return utils.findInData(data, { domUser: domainUser });
  },
  byIdentityCard: (identityCard: string) => {
    const data = utils.readJson("./mockFiles/city.json");
    return utils.findInData(data, { tz: identityCard });
  },
};
