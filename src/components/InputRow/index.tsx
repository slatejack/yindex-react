import { CommandInputType, UserType } from '@/base/interface';
import useHint from '@/utils/terminal/hint';
import { Input, InputRef } from 'antd';
import React, { ChangeEvent, Ref } from 'react';
import './index.scss';

const InputRow = ({ inputRef, onEnter, userInfo, inputCommand, setInputCommand, setHint }: {
  inputRef: Ref<InputRef>,
  onEnter: (value: CommandInputType) => void,
  userInfo: UserType,
  inputCommand: CommandInputType,
  setInputCommand: React.Dispatch<React.SetStateAction<CommandInputType>>,
  setHint: React.Dispatch<React.SetStateAction<string>>,
}) => {
  const prompt = `[${userInfo.username}]$`;
  const { debounceSetHint } = useHint({ showHint: true, setHint });

  const onChange = (value: ChangeEvent<HTMLInputElement>) => {
    const text = value.target.value;
    const placeholder = '';
    // 设置输入命令
    setInputCommand({
      text,
      placeholder,
    });
    // 同步更新hint
    debounceSetHint(text);
  };
  return (
    <div className='terminal-row'>
      <Input
        ref={inputRef}
        className='command-input'
        placeholder={inputCommand?.placeholder}
        onPressEnter={() => onEnter(inputCommand)}
        value={inputCommand?.text}
        addonBefore={<span className='command-input-prompt'>{prompt}</span>}
        onChange={onChange}
        bordered={false}
        autoFocus
      />
    </div>
  );
};

export default InputRow;