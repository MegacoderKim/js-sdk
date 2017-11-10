export const entityItemConfigFactory = (config) => {
  return {
    ...config,
    name: config.name || 'item',
    defaultQuery: {...config.defaultQuery},
    pollDuration: config.pollDuration || 10000,
    updateStrategy: config.updateStrategy || 'live',
  };
};

export const entityListConfigFactory = (config) => {
  return {
    ...config,
    name: config.name || 'list',
    defaultQuery: {page_size: 10, ...config.defaultQuery},
    pollDuration: config.pollDuration || 10000,
    updateStrategy: config.updateStrategy || 'live',
  };
}