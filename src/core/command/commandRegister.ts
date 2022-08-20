import { CommandType } from '@/base/interface';
import { pingCommand } from './network/pingCommand';
import helpCommand from './terminal/helpCommand';

/**
 * 命令列表
 */
const commandList: CommandType[] = [
  pingCommand,
  helpCommand,
];
/**
 * 命令字典
 */
const commandMap: Record<string, CommandType> = {};

/**
 * 刷新字典
 */
const doRershMap = () => {
  for (const command of commandList) {
    commandMap[command.func] = command; // 方法名
    command.alias?.forEach(name => { // 方法别名
      commandMap[name] = command;
    });
  }
};
doRershMap();


export {
  commandList,
  commandMap,
  doRershMap,
};