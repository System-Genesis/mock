import utils from "./utils";

export default {
  sf: () => {
    return utils.readJson("./mockFiles/sf.json");
  },
  eightSocks: () => {
    return utils.readJson("./mockFiles/eightSocks.json");
  },
  city: () => {
    return utils.readJson("./mockFiles/city.json");
  },
  aka: () => {
    return utils.readJson("./mockFiles/aka.json");
  },
  ad: () => {
    return utils.readJson("./mockFiles/ad.json");
  },
};
