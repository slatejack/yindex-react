import { debounce } from 'lodash';
import { commandMap } from '@/core/command/commandRegister';
import { getUsageStr } from './help';

/**
 * 命令提示
 */
const useHint = ({
  showHint,
  setHint,
}: {
  showHint: boolean,
  setHint: React.Dispatch<React.SetStateAction<string>>,
}) => {
  const hint = {
    current: '',
  };
  const getHint = (inputText: string) => {
    // 未开启提示
    if (!showHint) {
      return;
    }
    if (!inputText) {
      hint.current = '';
      return;
    }
    // 取命令名
    const args = inputText.trim().split(' ');
    const func = args[0];
    const command = commandMap[func]; // 根据命令名查找到命令函数
    if (!command) {
      hint.current = '';
      return;
    }
    // 子命令提示
    if (command.subCommands &&
      Object.keys(command.subCommands).length &&
      args.length > 1) {
      const subFuncName = args[1]; // 子命令名
      const subFunc = command.subCommands[subFuncName]; // 子命令实例
      hint.current = getUsageStr(subFunc, command);
    } else {
      hint.current = getUsageStr(command);
    }
    return hint;
  };

  /**
   * 提示防抖
   */
  const debounceSetHint = debounce((inputText: string) => {
    const hint = getHint(inputText);
    setHint(hint?.current ? hint.current : '');
  }, 500);

  return {
    hint,
    setHint,
    debounceSetHint,
  };
};

export default useHint;