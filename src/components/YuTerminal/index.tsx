import React, { CSSProperties, LegacyRef, useEffect, useRef, useState } from 'react';
import { CommandInputType, CommandOutputType, CommandType, OutputStatusType, OutputType, TerminalType, TextOutputType, UserType } from '@/base/interface';
import { Collapse, InputRef } from 'antd';
import useHistory from '@/utils/terminal/history';
import { doCommandExecute } from '@/utils/terminal/command';
import { registerShortcuts } from '@/utils/terminal/shortcut';
import { commandList as globalCommandList, doRershMap } from '@/core/command/commandRegister';
import CollapsiblePanel from '../CollapsiblePanel';
import NormalPanel from '../NormalPanel';
import InputRow from '../InputRow';
import InputTips from '../InputTips';
import './cover.module.scss';
import './index.scss';


/**
 * 添加外部命令
 * @param externalCommandList
*/
const addExternalCommand = (externalCommandList: CommandType[]) => {
  globalCommandList.push(...externalCommandList);
  doRershMap();
};

const YuTerminal = ({ fullScreen, height, userInfo }:
  {
    fullScreen?: boolean,
    height?: number,
    userInfo: UserType,
  }) => {
  const initCommand: CommandInputType = {
    text: '',
    placeholder: '',
  };
  const [activeKeys, setActivityKeys] = useState<string[] | string>([]);
  const [hint, setHint] = useState<string>(''); // 代码提示
  const [outputList, setOutputList] = useState<OutputType[]>([]);
  const [inputCommand, setInputCommand] = useState<CommandInputType>({
    text: '',
    placeholder: '',
  });
  const terminalRef = useRef<LegacyRef<HTMLDivElement>>();
  const inputRef = useRef<InputRef>(null);
  const commandList = useRef<CommandOutputType[]>([]);
  useEffect(() => {
    registerShortcuts(terminal);
    terminal.writeTextOutput(
      `Welcome to YuIndex-React, coolest browser index for geeks!
       https://github.com/liyupi/yuindex[GitHub Open Source For Vue]
       https://github.com/slatejack/yuIndex-react[GitHub Open Source For React]
      `
    );
    terminal.writeTextOutput(
      `Author-Vue https://docs.qq.com/doc/DUFFRVWladXVjeUxW[coder_yupi]
       Author-React https://github.com/slatejack[slatejack]
      : please input 'help' to enjoy
      `
    );
  }, []);

  /**
    * 全局记录当前命令，便于写入结果
 */
  const currentNewCommand = useRef<CommandOutputType>({
    text: '',
    type: 'command',
    resultList: [],
  });

  const fullScreenStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  const normalStyle: CSSProperties = {
    height: `${height}px`,
  };

  /**
 * 清空所有输出
 */
  const clear = () => {
    setOutputList([]);
  };

  /**
 * 写命令文本结果
 * @param text
 * @param status
 */
  const writeTextResult = (text: string, status?: OutputStatusType) => {
    const newOutput: TextOutputType = {
      text,
      type: 'text',
      status,
    };
    currentNewCommand.current.resultList?.push(newOutput);
  };

  /**
 * 写文本错误状态结果
 * @param text
 */
  const writeTextErrorResult = (text: string) => {
    writeTextResult(text, 'error');
  };

  /**
   * 写文本成功状态结果
   * @param text
   */
  const writeTextSuccessResult = (text: string) => {
    writeTextResult(text, 'success');
  };

  /**
 * 写结果
 * @param output
 */
  const writeResult = (output: OutputType) => {
    currentNewCommand.current.resultList.push(output);
  };

  /**
 * 立即输出文本
 * @param text
 * @param status
 */
  const writeTextOutput = (text: string, status?: OutputStatusType) => {
    const newOutput: TextOutputType = {
      text,
      type: 'text',
      status,
    };
    setOutputList(v => {
      const newV = [...v];
      newV.push(newOutput);
      return newV;
    });
  };

  /**
 * 设置命令是否可折叠
 * @param collapsible
 */
  const setCommandCollapsible = (collapsible: boolean) => {
    currentNewCommand.current.collapsible = collapsible;
  };

  /**
   * 立即输出
   * @param newOutput
   */
  const writeOutput = (newOutput: OutputType) => {
    setOutputList((v) => {
      const newV = [...v];
      newV.push(newOutput);
      return newV;
    });
  };

  /**
   * 输入框聚焦
   */
  const focusInput = () => {
    inputRef.current?.focus();
  };

  /**
 * 折叠 / 展开所有块
 */
  const toggleAllCollapse = () => {
    // 展开
    if (activeKeys.length === 0) {
      const curActivityKeys = outputList.map((_, index) => {
        return `${index}`;
      });
      setActivityKeys(curActivityKeys);
    } else {
      // 折叠
      setActivityKeys([]);
    }
  };

  const {
    commandHistoryPos,
    showPrevCommand,
    showNextCommand,
    listCommandHistory,
  } = useHistory(commandList.current, inputCommand, setInputCommand);

  /**
   * 提交命令
   * @param value 
   */
  const doSubmitCommand = async (value: CommandInputType) => {
    let inputText = value.text;
    let curOutputList;
    // 执行历史命令
    if (inputText.startsWith('!')) {
      const commandIndex = +inputText.substring(1);
      const command = commandList.current[commandIndex - 1];
      if (command) {
        inputText = command.text;
      }
    }
    // 执行命令
    const newCommand: CommandOutputType = {
      text: inputText,
      type: 'command',
      resultList: [],
    };
    // 记录当前命令，便于写入结果
    currentNewCommand.current = newCommand;
    // 执行命令
    await doCommandExecute(inputText, terminal);
    // 添加输出（为空也要输出换行）
    setOutputList(v => {
      const newV = [...v];
      newV.push(newCommand);
      curOutputList = newV;
      return newV;
    });
    if (inputText) {
      commandList.current.push(newCommand);
      // 重置当前要查看的命令位置
      commandHistoryPos.current = commandList.current.length;
    }
    setInputCommand({ ...initCommand });
    setActivityKeys((v) => {
      if (typeof (v) === 'string') {
        const newV = [v];
        newV.push(`${curOutputList.length - 1}`);
        return newV;
      }
      const newV = [...v];
      newV.push(`${curOutputList.length - 1}`);
      return newV;
    });
    setHint(''); // 清空提示
  };

  /**
    * 操作终端的对象
  */
  const terminal: TerminalType = {
    writeTextResult,
    writeTextErrorResult,
    writeTextSuccessResult,
    writeResult,
    writeTextOutput,
    writeOutput,
    clear,
    focusInput,
    doSubmitCommand,
    showPrevCommand,
    showNextCommand,
    listCommandHistory,
    toggleAllCollapse,
    setCommandCollapsible,
  };

  const collapseChange = (value: string[] | string) => {
    setActivityKeys(value);
  };

  return (
    <div className='yu-terminal-wrapper'>
      <div ref={terminalRef.current} className='yu-terminal' style={fullScreen ? fullScreenStyle : normalStyle}>
        <Collapse
          activeKey={activeKeys}
          bordered={false}
          expandIconPosition='right'
          onChange={collapseChange}
        >
          {
            outputList.map((output, oIndex) => (
              output.collapsible
                ? // 折叠样式组件
                <CollapsiblePanel
                  key={oIndex}
                  userInfo={userInfo}
                  output={output}
                />
                : // 不折叠样式组件
                <NormalPanel
                  output={output}
                  userInfo={userInfo}
                />
            ))
          }
        </Collapse>
        <InputRow
          inputRef={inputRef}
          onEnter={doSubmitCommand}
          userInfo={userInfo}
          inputCommand={inputCommand}
          setInputCommand={setInputCommand}
          setHint={setHint}
        />
        <InputTips
          hint={hint}
        />
        <div style={{ marginBottom: '16px' }} />
      </div>
    </div>
  );
};

YuTerminal.addExternalCommand = addExternalCommand;
export default YuTerminal;