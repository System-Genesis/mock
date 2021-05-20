import getDataService from "../utils/getDataService";
import utils from "../utils/utils";

export default {
  all: (query: object) => {
    let data = getDataService.city();
    if (query) data = utils.filterData(data, query);
    return data;
  },
  byPersonalNumber: (personalNumber: string) => {
    const data = getDataService.city();
    return utils.findInData(data, { personalNumber });
  },
  byDomainUser: (domainUser: string) => {
    const data = getDataService.city();
    return utils.findInData(data, { domUser: domainUser });
  },
  byIdentityCard: (identityCard: string) => {
    const data = getDataService.city();
    return utils.findInData(data, { tz: identityCard });
  },
};
