import React from 'react';
import { CommandType } from '@/base/interface';
import { getUsageStr } from '@/utils/terminal/help';
const CommandUseage = ({ command, parentCommand }: { command: CommandType, parentCommand: CommandType }) => (
  <>
    <div>用法：{getUsageStr(command, parentCommand)}</div>
    {
      command?.subCommands && Object.keys(command.subCommands).length > 0
        ? <>
          <div>子命令：</div>
          <ul style={{ marginTop: '0px' }}>
            {
              Object.keys(command.subCommands).map((subCommand) => {
                const subCommandRef: CommandType | undefined = command.subCommands?.[subCommand];
                return (
                  <li key={subCommandRef?.func}>
                    {subCommandRef?.func}
                    {subCommandRef?.name}
                    {subCommandRef?.desc}
                  </li>
                );
              })
            }
          </ul>
        </>
        : null
    }
  </>
);

export default CommandUseage;