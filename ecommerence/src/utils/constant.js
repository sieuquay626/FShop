import config from '../_env/dev.json';

export const API_HOST = config.API_HOST;

export const API_VERSION = config.API_VERSION;

export const API_KEY = config.API_KEY;

export const SIZE_BANNER = config.SIZE_BANNER;

export const ViewType = {
  GRID: 'grid',
  LIST: 'list'
};

export const SortBy = [
  { index: 0, name: 'Name(A-Z)' },
  { index: 1, name: 'Name(Z-A)' },
  { index: 2, name: 'Price(High-Low)' },
  { index: 3, name: 'Price(Low-Hight)' }
];

export const options_types = [
  { id: 1, name: 'Color' },
  { id: 2, name: 'Size' }
];
export const template_option_values = [
  { id: 1, options_type_id: 1, value: 'Red' },
  { id: 2, options_type_id: 1, value: 'Green' },
  { id: 3, options_type_id: 1, value: 'White' },
  { id: 4, options_type_id: 1, value: 'Black' },
  { id: 5, options_type_id: 2, value: 'Small' },
  { id: 6, options_type_id: 2, value: 'Medium' },
  { id: 7, options_type_id: 2, value: 'Large' },
  { id: 8, options_type_id: 2, value: 'Extra-Large' }
];
