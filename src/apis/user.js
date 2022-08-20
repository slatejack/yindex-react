import network from '@/utils/request';
import API from './map';
const getUserInfo = ({
  userId
}) => network.request({
  url: API.GET_USER_INFO,
  method: 'GET',
  params: {
    user_id: userId,
  }
});

const userLogin = ({
  userName,
  userPass,
  token,
}) => network.request({
  url: API.USER_LOGIN,
  method: 'POST',
  data: {
    user_name: userName,
    user_pass: userPass,
    token,
  }
});

const userLoginAgain = ({
  userKey
}) => network.request({
  url: API.USER_LOGIN_AGAGIN,
  method: 'POST',
  data: {
    user_key: userKey,
  }
});

const userRegiste = ({
  userName,
  userPass,
  userMobile,
}) => network.request({
  url: API.USER_REGISTER,
  method: 'POST',
  data: {
    user_name: userName,
    user_pass: userPass,
    user_mobile: userMobile,
  }
});

const APIs = {
  getUserInfo,
  userLogin,
  userRegiste,
  userLoginAgain,
};
export default APIs;