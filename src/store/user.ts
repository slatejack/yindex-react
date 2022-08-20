import { action, makeAutoObservable } from 'mobx';
import userApi from '@/apis/user';
import { isHydrated, makePersistable } from 'mobx-persist-store';
// 用户状态
class User {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'terminal-user-store',
      properties: ['userInfo'],
      storage: window.localStorage,
    }).then(
      action((persistStore) => {
        console.log('load terminalUserStore data complete', persistStore);
      })
    );
  }
  // 用户信息
  userInfo = {
    username: 'local',
  };
  // 更新UserInfo
  updateUserInfo = async ({ userKey }: { userKey: string }) => {
    const res = await userApi.userLoginAgain({
      userKey,
    });
    if (res.data.code === 0) {
      const data = res.data.data;
      const formatUserInfo = {
        username: data.user_name,
      };
      this.userInfo = formatUserInfo;
    }
  };

  get isHydrated() {
    return isHydrated(this);
  }

  get getUserInfo() {
    return this.userInfo;
  }
}

export default User;