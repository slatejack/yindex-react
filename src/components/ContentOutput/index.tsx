import React from 'react';
import loadable from '@loadable/component';
import { Tag } from 'antd';
import { OutputType } from '@/base/interface';
import SmartTextView from '../SmartTextView';
import './index.scss';

const TAG_COLOR: Record<string, string> = {
  success: 'success',
  info: 'processing',
  warning: 'warning',
  error: 'error',
  system: '',
};
const ContentOutput = ({ output }: { output: OutputType }) => {
  // 输出Tag颜色
  const outputTagColor = (status: string | undefined): string => {
    if (!status || !TAG_COLOR[status]) {
      return '';
    }
    return TAG_COLOR[status];
  };
  const hyperlink = output.text ? output.text : '';
  const Component = loadable(() => import(`@/components/${output.component}`));
  return (
    <div className='content-output'>
      {
        output.type === 'text'
          ? <>
            {
              output.status && <Tag color={outputTagColor(output.status)}>{output.status}</Tag>
            }
            <SmartTextView
              hyperlink={hyperlink}
            />
          </>
          : null
      }
      {
        output.type === 'component'
          ? Component && <Component />
          : null
      }
    </div>
  );
};

export default ContentOutput;