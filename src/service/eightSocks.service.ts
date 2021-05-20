import utils from "../utils/utils";

export default {
  all: (query: object) => {
    let data = utils.readJson("./mockFiles/eightSocks.json");
    if (query) data = utils.filterData(data, query);
    return data;
  },
  byPersonalNumber: (personalNumber: string) => {
    const data = utils.readJson("./mockFiles/eightSocks.json");
    return utils.findInData(data, { tz: personalNumber });
  },
  byDomainUser: (domainUser: string) => {
    const data = utils.readJson("./mockFiles/eightSocks.json");
    return utils.findInData(data, { userName: domainUser });
  },
  byIdentityCard: (identityCard: string) => {
    const data = utils.readJson("./mockFiles/eightSocks.json");
    return utils.findInData(data, { mi: identityCard });
  },
};
