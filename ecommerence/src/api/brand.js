import axiosInstance from '../utils/axios';

const brand_api = () => {
  return axiosInstance.get('/brand');
};

const create_brand_api = ({ name, photo }) => {
  return axiosInstance.post('/brand', {
    name,
    photo
  });
};

const delete_brand_api = id => {
  return axiosInstance.delete('/brand', {
    data: { id }
  });
};

const search_brand_api = value => {
  return axiosInstance.get(`/brand/search/${value}`);
};

export { brand_api, create_brand_api, delete_brand_api, search_brand_api };
