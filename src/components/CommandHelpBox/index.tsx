import React from 'react';
import { CommandType } from '@/base/interface';
import CommandUseage from './CommandUseage';
import CommandParams from './CommandParams';
import CommandOptions from './CommandOptions';
import CommandOrder from './CommandOrder';


const CommandHelpBox = ({ command, parentCommand }: { command: CommandType, parentCommand: CommandType }) => (
  <div>
    <CommandOrder
      command={command}
    />
    <CommandUseage
      command={command}
      parentCommand={parentCommand}
    />
    <CommandParams
      command={command}
    />
    <CommandOptions
      command={command}
    />
  </div>
);

export default CommandHelpBox;