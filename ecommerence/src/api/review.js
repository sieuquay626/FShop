import axiosInstance from '../utils/axios';

const check_review = ({ product_id, postedBy }) => {
  console.log(product_id, postedBy);
  return axiosInstance.get(
    `/review/check_review`,
    {
      product_id: product_id,
      postedBy: postedBy
    },
    {
      withCredentials: true,
      crossorigin: true
    }
  );
};

export { check_review };
