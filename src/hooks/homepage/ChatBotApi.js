import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const fetchChatBotResponse = async (userMessage) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/user/chat-bot`, {
      message: userMessage,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching chat-bot response:', error);
    throw new Error('An error occurred while fetching chat-bot response');
  }
};

export default fetchChatBotResponse;
