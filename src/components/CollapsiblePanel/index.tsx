import React from 'react';
import { Collapse } from 'antd';
import { OutputType, UserType } from '@/base/interface';
import ContentOutput from '../ContentOutput';
import './index.scss';


const { Panel } = Collapse;
const CollapsiblePanel = ({ key, userInfo, output, ...prop }:
  {
    key: number,
    userInfo: UserType,
    output: OutputType,
  }) => {
  const prompt = `[${userInfo.username}]$`;
  return (
    <>
      <Panel
        key={`${key}`}
        header={
          <div className='terminal-row'>
            <span className='terminal-row_span'>
              {prompt}
            </span>
            <span>{output.text}</span>
          </div>
        }
        {...prop}
      >
        {
          output.resultList?.map((result, rIndex) => (
            <ContentOutput
              output={result}
              key={rIndex}
            />
          ))
        }
      </Panel>
    </>
  );
};

export default CollapsiblePanel;