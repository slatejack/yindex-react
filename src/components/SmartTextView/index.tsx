import React from 'react';
import { smartText } from '@/utils/utils';
import { URL_REG } from '@/utils/utils';

/**
 * 超链接文本输出组件
 * @param param0 
 * @returns 
 */
const SmartTextView = ({ hyperlink }: { hyperlink: string }) => (
  <span>
    {
      smartText(hyperlink).length > 0
        ? smartText(hyperlink).map((word, wIndex) => {
          if (word.startsWith('[')) {
            const endIndex = word.indexOf(']');
            word = word.slice(endIndex + 1);
          }
          const isMatch = word.match(URL_REG);
          if (isMatch) {
            let value = '';
            const url = isMatch[0];
            const valueScope = smartText(hyperlink)?.[wIndex + 1] || '';
            if (valueScope.startsWith('[')) {
              const endIndex = valueScope.indexOf(']');
              value = valueScope.slice(0, endIndex + 1);
            }
            return <a href={url.startsWith('http') ? url : `http://${url}`}>{!value ? '链接地址' : value}</a>;
          }

          return word;
        })
        : null
    }
  </span>
);

export default SmartTextView;