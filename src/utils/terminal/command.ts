import getopts, { ParsedOptions } from 'getopts';
import { CommandOptionType, CommandType, TerminalType } from '@/base/interface';
import { commandMap } from '@/core/command/commandRegister';
import helpCommand from '@/core/command/terminal/helpCommand';
export const doCommandExecute = async (
  text: string,
  terminal: TerminalType,
  parentCommand?: CommandType,
) => {
  if (!text) {
    return;
  }
  // 解析文本得到命令
  const command: CommandType = getCommand(text, parentCommand);
  if (!command) {
    terminal.writeTextErrorResult(`can not find command: ${text}`);
    return;
  }

  // 解析参数
  const parsedOptions = doParse(text, command.options);
  const { _ } = parsedOptions;
  // 如果存在子命令，执行
  if (_.length > 0
    && command.subCommands
    && Object.keys(command.subCommands).length > 0
  ) {
    // 将子命令当做新命令解析, eg: user login xxx => login xxx
    const subText = text.substring(text.indexOf(' ') + 1);
    await doCommandExecute(subText, terminal, command);
    return;
  }
  await doAction(command, parsedOptions, terminal, parentCommand);
};

/**
 * 匹配命令
 * @param text 
 * @param parentCommand 
 */
const getCommand = (text: string, parentCommand?: CommandType): CommandType => {
  const [func] = text.split(' ', 1);
  let commands = commandMap;
  // 如果有父命令，则从父命令中查找
  if (parentCommand
    && parentCommand.subCommands
    && Object.keys(parentCommand.subCommands).length > 0
  ) {
    commands = parentCommand.subCommands;
  }
  const command = commands[func]; // 获取到命令
  console.log('getCommand = ', command);
  return command;
};

/**
 * 解析参数
 * @param text 
 * @param commandOptions 
 */
const doParse = (
  text: string,
  commandOptions: CommandOptionType[],
): getopts.ParsedOptions => {
  // 过滤到最开头的空字符
  const args: string[] = text.split(' ').slice(1);
  // 转换
  const options: getopts.Options = {
    alias: {},
    default: {},
    string: [],
    boolean: [],
  };
  commandOptions.forEach(commandOption => {
    const { alias, key, type, defaultValue } = commandOption;
    if (alias && options.alias) {
      options.alias[key] = alias;
    }
    options[type]?.push(key);
    if (defaultValue && options.default) {
      options.default[key] = defaultValue;
    }
  });
  const parsedOptions = getopts(args, options);
  console.log('parsed options: ', parsedOptions);
  return parsedOptions;
};

const doAction = async (
  command: CommandType,
  options: ParsedOptions,
  terminal: TerminalType,
  parentCommand?: CommandType,
) => {
  const { help } = options;
  // 设置输出是否折叠
  if (command.collapsible || help) {
    terminal.setCommandCollapsible(true);
  }
  // 帮助命令
  // eg: user --help => {_: ['xxx']}
  if (help) {
    const newOptions = { ...options, _: [command.func] };
    helpCommand.action(newOptions, terminal, parentCommand);
    return;
  }
  await command.action(options, terminal);
};