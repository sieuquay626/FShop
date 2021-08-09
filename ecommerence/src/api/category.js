import axiosInstance from '../utils/axios';

const category_api = () => {
  return axiosInstance.get('/category');
};
const create_category_api = name => {
  return axiosInstance.post('/category', {
    name
  });
};
const delete_category_api = id => {
  return axiosInstance.delete('/category', {
    data: { id }
  });
};
const search_category_api = value => {
  return axiosInstance.get(`/category/search/${value}`);
};

export {
  category_api,
  create_category_api,
  delete_category_api,
  search_category_api
};
