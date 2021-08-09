import { FileMinus } from 'react-feather';
import axiosInstance from '../utils/axios';

const upload_img = ({ files }) => {
  return axiosInstance.post(
    `/upload`,
    {
      files
    },
    {
      withCredentials: true,
      crossorigin: true
    }
  );
};

export { upload_img };
