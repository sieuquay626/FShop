import axiosInstance from '../utils/axios';
const polular_product_api = filter => {
  console.log('polular_product_api');
  const {
    page,
    limit,
    keyword,
    brand,
    category,
    minPrice,
    maxPrice,
    sortBy
  } = filter;
  // console.log({ filter });
  let url = `/product?page=${page}&limit=${limit}`;
  if (keyword) {
    url += `&title[regex]=${keyword}`;
  }
  if (brand) {
    console.log(brand);
    url += `&detail.brand=${brand}`;
  }
  if (category) {
    url += `&detail.category=${category}`;
  }
  if (minPrice) {
    url += `&price[gte]=${minPrice}`;
  }
  if (maxPrice) {
    url += `&price[lte]=${maxPrice}`;
  }
  if (!sortBy) {
    url += `&sort=-sold`;
  } else {
    if (sortBy === 'name-asc') {
      url += `&sort=-sold,title`;
    }
    if (sortBy === 'name-desc') {
      url += `&sort=-sold,-title`;
    }
    if (sortBy === 'price-asc') {
      url += `&sort=-sold,price`;
    }
    if (sortBy === 'price-desc') {
      url += `&sort=-sold,-price`;
    }
  }

  console.log({ url });
  return axiosInstance.get(url);
};

const arrvial_product_api = filter => {
  console.log('arrvial_product_api');
  const {
    page,
    limit,
    keyword,
    brand,
    category,
    minPrice,
    maxPrice,
    sortBy
  } = filter;
  console.log({ filter });
  let url = `/product?page=${page}&limit=${limit}`;
  if (keyword) {
    url += `&title[regex]=${keyword}`;
  }
  if (brand) {
    url += `&detail.brand=${brand}`;
  }
  if (category) {
    url += `&detail.category=${category}`;
  }
  if (minPrice) {
    url += `&price[gte]=${minPrice}`;
  }
  if (maxPrice) {
    url += `&price[lte]=${maxPrice}`;
  }

  if (!sortBy) {
    url += `&sort=-createdAt`;
  } else {
    if (sortBy === 'name-asc') {
      url += `&sort=-createdAt,title`;
    }
    if (sortBy === 'name-desc') {
      url += `&sort=-createdAt,-title`;
    }
    if (sortBy === 'price-asc') {
      url += `&sort=-createdAt,price`;
    }
    if (sortBy === 'price-desc') {
      url += `&sort=-createdAt,-price`;
    }
  }
  console.log({ url });
  return axiosInstance.get(url);
};
const toprate_product_api = filter => {
  console.log('toprate_product_api');
  const {
    page,
    limit,
    keyword,
    brand,
    category,
    minPrice,
    maxPrice,
    sortBy
  } = filter;
  let url = `/product?page=${page}&limit=${limit}`;
  if (keyword) {
    url += `&title[regex]=${keyword}`;
  }
  if (brand) {
    url += `&detail.brand=${brand}`;
  }
  if (category) {
    url += `&detail.category=${category}`;
  }
  if (minPrice) {
    url += `&price[gte]=${minPrice}`;
  }
  if (maxPrice) {
    url += `&price[lte]=${maxPrice}`;
  }
  if (!sortBy) {
    url += `&sort=-avgRating`;
  } else {
    if (sortBy === 'name-asc') {
      url += `&sort=-avgRating,title`;
    }
    if (sortBy === 'name-desc') {
      url += `&sort=-avgRating,-title`;
    }
    if (sortBy === 'price-asc') {
      url += `&sort=-avgRating,price`;
    }
    if (sortBy === 'price-desc') {
      url += `&sort=-avgRating,-price`;
    }
  }
  console.log({ url });
  return axiosInstance.get(url);
};

const gender_product_api = ({ data, filter }) => {
  console.log('gender_product_api');
  const { gender, type } = data;
  const {
    page,
    limit,
    keyword,
    brand,
    category,
    minPrice,
    maxPrice,
    sortBy
  } = filter;
  let url = `/product?page=${page}&limit=${limit}&detail.gender=${gender}`;
  if (keyword) {
    url += `&title[regex]=${keyword}`;
  }
  if (brand) {
    url += `&detail.brand=${brand}`;
  }
  if (category) {
    url += `&detail.category=${category}`;
  } else {
    url += `&detail.category=${type}`;
  }
  if (minPrice) {
    url += `&price[gte]=${minPrice}`;
  }
  if (maxPrice) {
    url += `&price[lte]=${maxPrice}`;
  }

  if (sortBy == 'name-asc') {
    url += `&sort=title`;
  }
  if (sortBy == 'name-desc') {
    url += `&sort=-title`;
  }
  if (sortBy == 'price-asc') {
    url += `&sort=price`;
  }
  if (sortBy == 'price-desc') {
    url += `&sort=-price`;
  }

  console.log(url);
  return axiosInstance.get(
    `/product/?detail.gender=${gender}&detail.category=${type}`
  );
};

const product_id_api = id => {
  return axiosInstance.get(`/product/${id}`);
};

const recomment_product = user => {
  return axiosInstance.post(
    `review/predict`,
    {
      user
    },
    {
      withCredentials: true,
      crossorigin: true
    }
  );
};

const gender_category = () => {
  return axiosInstance.get(`/product/gender/category`, {
    withCredentials: true,
    crossorigin: true
  });
};

const all_product_api = () => {
  return axiosInstance.get(`/product/allproduct`);
};

const update_product_api = (id, payload) => {
  return axiosInstance.put(`/product/${id}`, {
    ...payload
  });
};

const create_product_api = payload => {
  console.log('vao');
  return axiosInstance.post(`/product`, {
    ...payload
  });
};
// const create_brand_api = ({ name, photo }) => {
//   return axiosInstance.post('/brand', {
//     name,
//     photo
//   });
// };
export {
  polular_product_api,
  arrvial_product_api,
  toprate_product_api,
  gender_product_api,
  product_id_api,
  recomment_product,
  gender_category,
  all_product_api,
  update_product_api,
  create_product_api
};
