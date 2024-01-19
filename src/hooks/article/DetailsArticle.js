import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const getArticleDetails = async (articleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/article/details/${articleId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article details:', error);
    throw error;
  }
};

export default getArticleDetails;