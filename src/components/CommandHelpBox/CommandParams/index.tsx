import React from 'react';
import { CommandType } from '@/base/interface';

const CommandParams = ({ command }: { command: CommandType }) => (
  <>
    {
      command.params && command.params.length > 0
        ? <>
          <div>参数：</div>
          <ul style={{ marginBottom: '0px' }}>
            {
              command.params.map((param) => (
                <li key={param.key}>
                  {param.key}
                  {param.required ? '必填' : '可选'}
                  {param.defaultValue ? `默认值：${param.defaultValue}` : ''}
                  {param.desc}
                </li>
              ))
            }
          </ul>
        </>
        : null
    }
  </>
);

export default CommandParams;