import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const BASE_URL = "http://192.168.1.21:3001"

export const getApi = async (url, queryParams = {}, headers = {}, navigator) => {
  try {
    const response = await axios({
      method: 'GET',
      url,
      params: queryParams,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('Error making GET request:', error);
    handleApiError(navigator, error)
    throw error;
  }
};

export const postApi = async (url, headers = {}, body = {}, navigator) => {
  try {
    const response = await axios({
      method: 'POST',
      url,
      headers,
      data: body,
    });

    return response.data;
  } catch (error) {
    console.error('Error making POST request:', error);
    handleApiError(navigator, error)
    throw error;
  }
};

const handleApiError = (navigator, error) => {

  if (error.response && error.response.status === 400) {
    const errorCode = error.response.data?.code;
    if (errorCode === 1000) {
      localStorage.removeItem('key');
      navigator('/login'); // Redirect to login page
    }
  }
};
