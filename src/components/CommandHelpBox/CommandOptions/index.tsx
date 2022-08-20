import React from 'react';
import { CommandType } from '@/base/interface';
import { getOptionKeyList } from '@/utils/terminal/help';
const CommandOptions = ({ command }: { command: CommandType }) => (
  <>
    {
      command.options?.length > 0
        ? <>
          <div>选项：</div>
          <ul style={{ marginBottom: '0px' }}>
            {
              command.options.map((option) => (
                <li key={option.key}>
                  {getOptionKeyList(option).join(', ')}
                  {option.required ? '必填' : '可选'}
                  {option.defaultValue ? `默认：${option.defaultValue}` : ''}
                  {option.desc}
                </li>
              ))
            }
          </ul>
        </>
        : null

    }
  </>
);

export default CommandOptions;