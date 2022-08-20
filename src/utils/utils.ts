/**
 * 终端主样式
 * @param param0 
 * @returns 
 */
const mainStyle = ({ fullScreen, height }: { fullScreen: boolean, height: number }) => {
  const fullScreenStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
  };
  return fullScreen
    ? fullScreenStyle
    : {
      height,
    };
};
/**
 * 终端包装类样式
 * @param param0 
 * @returns 
 */
const wrapperStyle = ({ background }: { background: string }) => {
  const style = {
    ...mainStyle,
    background: background.startsWith('http')
      ? `url(${background})`
      : background,
  };
  return style;
};

/**
 * 匹配URL正则
 */
const URL_REG = /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9-]{1,61}[a-z0-9])?\.[^.|\s])+[a-z.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_/~#&=;%+?\-\\(\\)]*)/gi;

/**
 * 识别文本中的超链接JSON
 * @param text
 */
const smartText = (text?: string): Array<string> => {
  if (!text) {
    return [`${text}`];
  }
  const resText = text.split(URL_REG);
  return resText;
};

export {
  mainStyle,
  wrapperStyle,
  smartText,
  URL_REG,
};