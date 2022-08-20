import React from 'react';
import { OutputType, UserType } from '@/base/interface';
import ContentOutput from '../ContentOutput';
import './index.scss';

const NormalPanel = ({ output, userInfo }: { output: OutputType, userInfo: UserType }) => {
  const prompt = `[${userInfo.username}]$`;
  return (
    <>
      {
        output.type === 'command'
          ? // 输出命令及结果
          <>
            <div className='terminal-row'>
              <span className='terminal-row_span'>
                {prompt}
              </span>
              <span>{output.text}</span>
            </div>
            {
              output.resultList?.length && output.resultList.map((result, rIndex) => (
                <div className='terminal-row' key={rIndex}>
                  <ContentOutput
                    output={result}
                  />
                </div>
              ))
            }
          </>
          : <div className="terminal-row">
            <ContentOutput
              output={output}
            />
          </div>
      }
    </>
  );
};

export default NormalPanel;