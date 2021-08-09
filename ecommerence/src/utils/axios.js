import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `http://localhost:5000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

const httpService = {
  setupInterceptors: store => {
    axiosInstance.interceptors.response.use(
      response => {
        const total = parseInt(response.headers['x-total-count'], 10) || 0;

        return {
          data: response,
          total
        };
      },
      error => {
        // 401, 403
        if (error.response.status === 401 || error.response.status === 403) {
          // store.dispatch(handleLogout());
        }

        return Promise.reject(error);
      }
    );
  }
};

export default axiosInstance;
export { httpService };
