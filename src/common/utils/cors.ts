import { isDev } from './tools';

//允许访问的域名
export default {
  cors: isDev() ? '*' : ['http://music.westcat.cn', 'https://music.westcat.cn'],
};
