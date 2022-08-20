import React from 'react';
/**
 * 输入提示
 */
const InputTips = ({ hint }: { hint: string }) => {
  return (
    <>
      {
        hint
          ? <div className='terminal-row' style={{ color: '#bbb' }}>
            hint: {hint}
          </div>
          : null
      }
    </>
  );
};

export default InputTips;