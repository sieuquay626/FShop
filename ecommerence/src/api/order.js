import axiosInstance from '../utils/axios';

const get_order = ({ id }) => {
  console.log(id);
  return axiosInstance.get(`/order/${id}`, {
    withCredentials: true,
    crossorigin: true
  });
};
const get_all_order = () => {
  return axiosInstance.get(`/order/allorder`, {
    withCredentials: true,
    crossorigin: true
  });
};

const update_status_order = ({ id, status }) => {
  return axiosInstance.put(
    `/order/update-status`,
    {
      id,
      status
    },
    {
      withCredentials: true,
      crossorigin: true
    }
  );
};

const create_order = ({ order, type }) => {
  return axiosInstance.post(
    '/order',
    {
      order,
      type
    },
    {
      withCredentials: true,
      crossorigin: true
    }
  );
};
const order_by_user = ({ id }) => {
  console.log(id);
  return axiosInstance.get(`/order/byuser/${id}`, {
    withCredentials: true,
    crossorigin: true
  });
};
const order_cancel = ({ id }) => {
  return axiosInstance.post(
    `/order/cancel`,
    {
      id
    },
    {
      withCredentials: true,
      crossorigin: true
    }
  );
};

export {
  create_order,
  get_order,
  order_by_user,
  order_cancel,
  get_all_order,
  update_status_order
};
