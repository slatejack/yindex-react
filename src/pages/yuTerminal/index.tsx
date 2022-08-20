import React from 'react';
import YuTerminal from '@/components/YuTerminal';
import User from '@/store/user';
import { observer } from 'mobx-react';

const userStore = new User();
const Index = observer(() => {
  YuTerminal.addExternalCommand([{
    func: 'test',
    name: 'test',
    desc: '外部命令添加测试',
    params: [
      {
        key: 'name',
        desc: '用户名称',
        required: true,
      },
    ],
    options: [],
    action: async (options, terminal) => {
      const { _ } = options;
      if (_.length < 1) {
        terminal.writeTextErrorResult('参数不足');
        return;
      }
      const name = _[0];
      terminal.writeTextResult(`hello, ${name}`);
    },
  }]);
  return (
    <YuTerminal
      fullScreen={true}
      userInfo={userStore.getUserInfo}
    />
  );
});

export default Index;