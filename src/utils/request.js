import axios from 'axios';
import config from '@/config/config';

const instance = axios.create({
  baseURL: config.baseUrl,
  timeout: 20 * 1000, // 超时时间20s
  validateStatus: () => true,
});

export default instance;