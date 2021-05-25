import fn from '../config/fieldNames';

export default {
  RANK: ['unknown', 'rookie', 'champion', 'ultimate', 'mega'] as const,

  CURRENT_UNIT: ['nitro unit', 'jelly unit'] as const,
  ENTITY_TYPE: ['digimon', 'agumon', 'tamar'] as const,
  RESPONSIBILITY: ['none', 'HR', 'SO'] as const,
  STATUS: ['active', 'inactive'] as const,

  DOMAIN_MAP: [
    ['rabiran.com', 'rabiranuid'] as const,
    ['somedomain.com', 'somedomainuid'] as const,
    ['jello.com', 'jellouid'] as const,
    ['jello2.com', 'jellouid'] as const,
    ['turtle.com', 'turtle'] as const,
    ['donatelo.turtle.com', 'turtle'] as const,
    ['rafael.turtle.com', 'turtle'] as const,
    ['leonardo.com', 'ddd'] as const,
  ] as const,

  SERVICE_TYPE: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const,
  UNIT: ['gondor', 'mordor', 'wallmart', 'valhalla'] as const,
  ES_UNIT: ['es1', 'es2', 'es3', 'es4', 'es5', 'es6'] as const,
  ADS_UNIT: ['ads1', 'ads2', 'ads3', 'ads4', 'ads5', 'ads6'] as const,
  CITY_UNIT: ['city1', 'city2', 'city3', 'city4', 'city5', 'city6'] as const,
  MM_UNIT: ['mm1', 'mm2', 'mm3', 'mm4', 'mm5', 'mm6'] as const,
  CITY_TAGS: [
    {
      name: fn[fn.dataSources.city].userTags.transportable,
    },
    {
      name: fn[fn.dataSources.city].userTags.information,
    },
  ] as const,
  CITY_DOMAINS: [
    fn[fn.dataSources.city].domainNames.internal,
    fn[fn.dataSources.city].domainNames.external,
  ] as const,
  ROOT_HIERARCHY: [
    'armagadon',
    'bladerunners',
    'interstellar',
    'odyssey',
  ] as const,
  CITY_MAIL: 'turtleS.com',
  ID_PREFIXES: [
    'e',
    'e',
    'e',
    'e',
    'e',
    'e',
    'ee',
    'e8e',
    'e',
    'e',
    'g',
    'g',
    'gf',
    'g5f',
    'l',
    'j',
    'i',
    'ii',
    'm',
    'm',
    'm',
  ] as const,
};
