import { ParsedOptions } from 'getopts';

/**
   * 用户类型
   */
interface UserType {
  username: string;
  role?: number;
  email?: string;
  createTime?: Date;
  updateTime?: Date;
}

/**
 * 命令输入类型
 */
interface CommandInputType {
  text: string;
  placeholder?: string;
}
/**
 * 输出类型
 */
interface OutputListType {
  type: 'command' | 'text' | 'components';
  text?: string;
  resultList?: OutputListType[];
  component?: any;
  status?: OutputStatusType;
  props?: any;
  collapsible: boolean;
}

/**
 * 输出状态类型
 */
type OutputStatusType = 'info' | 'success' | 'warning' | 'error' | 'system';

/**
 * 命令类型
 */
interface CommandType {
  // 命令英文 key（必须唯一）
  func: string;
  // 命令名称
  name: string;
  // 介绍
  desc?: string;
  // 功能别名
  alias?: string[];
  // 参数配置
  params?: CommandParamsType[];
  // 选项配置
  options: CommandOptionType[];
  // 子命令
  subCommands?: Record<string, CommandType>;
  // 执行功能
  action: (
    options: ParsedOptions,
    terminal: TerminalType,
    parentCommand?: CommandType
  ) => void;
  // 结果是否允许折叠
  collapsible?: boolean;
}

/**
 * 命令参数类型
 */
interface CommandParamsType {
  key: string; // 参数名
  desc?: string; // 描述
  defaultValue?: string | boolean;
  required?: boolean; // 是否必填
}

/**
 * 命令选项类型
 */
interface CommandOptionType {
  key: string; // 参数名，比如 --word
  alias?: string[]; // 命令简写，比如 -w
  desc?: string; // 描述
  type: 'string' | 'boolean';
  defaultValue?: string | boolean; // 默认值，标识作用
  required?: boolean; // 是否必填
}

/**
   * 终端类型（定义一组访问及操作终端的方法）
   */
interface TerminalType {
  // 清屏
  clear: () => void;
  // 立即输出
  writeOutput: (output: OutputType) => void;
  // 立即输出文本
  writeTextOutput: (text: string, status?: OutputStatusType) => void;
  // 写命令文本结果
  writeTextResult: (text: string, status?: OutputStatusType) => void;
  // 写命令错误文本结果
  writeTextErrorResult: (text: string) => void;
  // 写命令成功文本结果
  writeTextSuccessResult: (text: string) => void;
  // 写命令结果
  writeResult: (output: OutputType) => void;
  // 输入框聚焦
  focusInput: () => void;
  // 提交命令
  doSubmitCommand: (value: CommandInputType) => void;
  // 查看下一条命令
  showNextCommand: () => void;
  // 查看上一条命令
  showPrevCommand: () => void;
  // 查看历史命令
  listCommandHistory: () => CommandOutputType[];
  // 折叠 / 展开所有块
  toggleAllCollapse: () => void;
  // 设置命令是否可折叠
  setCommandCollapsible: (collapsible: boolean) => void;
}

/**
   * 命令类型输出
   */
interface CommandOutputType extends OutputType {
  type: 'command';
  text: string;
  resultList: OutputType[];
}

/**
   * 输出类型
   */
interface OutputType {
  type: 'command' | 'text' | 'component';
  text?: string;
  resultList?: OutputType[];
  component?: any;
  status?: OutputStatusType;
  props?: any;
  collapsible?: boolean;
}

/**
   * 组件类型输出
   */
interface ComponentOutputType extends OutputType {
  type: 'component';
  component: any;
  props?: any;
}

/**
 * 文本类型输出
 */
interface TextOutputType extends OutputType {
  type: 'text';
  text: string;
}


export type {
  UserType,
  CommandInputType,
  OutputListType,
  OutputStatusType,
  CommandType,
  CommandParamsType,
  CommandOptionType,
  TerminalType,
  CommandOutputType,
  OutputType,
  ComponentOutputType,
  TextOutputType,
};
