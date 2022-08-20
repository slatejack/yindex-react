import React from 'react';
import { CommandType } from '@/base/interface';
const CommandOrder = ({ command }: { command: CommandType }) => (
  <>
    <div>命令：{command.name}</div>
    {command?.desc && <div>介绍：{command.desc} </div>}
    {
      command.alias && command.alias.length > 0
        ? <div>别名：{command.alias.join(', ')}</div>
        : null
    }
  </>
);

export default CommandOrder;