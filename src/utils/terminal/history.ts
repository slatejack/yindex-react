import { CommandInputType, CommandOutputType } from '@/base/interface';
import React, { Dispatch, useRef } from 'react';

/**
 * 查看历史功能
 * @param commandList 
 * @param inputCommand 
 * @param setInputCommand
 */
const useHistory = (
  commandList: CommandOutputType[],
  inputCommand: CommandInputType,
  setInputCommand: Dispatch<React.SetStateAction<CommandInputType>>,
) => {
  /**
   * 当前查看的命令位置
   */
  const commandHistoryPos = useRef(commandList.length);

  const listCommandHistory = () => {
    return commandList;
  };

  const showNextCommand = () => {
    console.log(commandHistoryPos, commandList, inputCommand);
    if (commandHistoryPos.current < commandList.length - 1) {
      commandHistoryPos.current++;
      setInputCommand(v => {
        const newV = { ...v };
        newV.text = commandList[commandHistoryPos.current].text;
        return newV;
      });
    } else if (commandHistoryPos.current === commandList.length - 1) {
      commandHistoryPos.current++;
      setInputCommand(v => {
        const newV = { ...v };
        newV.text = '';
        return newV;
      });
    }
  };

  const showPrevCommand = () => {
    console.log(commandHistoryPos.current, commandList, inputCommand);
    if (commandHistoryPos.current >= 1) {
      commandHistoryPos.current--;
      setInputCommand(v => {
        const newV = { ...v };
        newV.text = commandList[commandHistoryPos.current].text;
        return newV;
      });
    }
  };

  return {
    commandHistoryPos,
    listCommandHistory,
    showNextCommand,
    showPrevCommand,
  };
};

export default useHistory;