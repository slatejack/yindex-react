import React from 'react';
import YuTerminal from '@/components/YuTerminal';
import User from '@/store/user';
import { observer } from 'mobx-react';

const userStore = new User();
const Index = observer(() => {
  return (
    <YuTerminal
      fullScreen={true}
      userInfo={userStore.getUserInfo}
    />
  );
});

export default Index;