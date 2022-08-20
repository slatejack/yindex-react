import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class TerminalConfig {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'terminal-config-store',
      properties: ['background', 'showHint'],
      storage: window.localStorage,
    }).then(
      action((persistStore) => {
        console.log('load terminalConfigStore data complete', persistStore);
      })
    );
  }
  // 背景颜色
  background = 'black';
  // 是否展示提示文字
  showHint = true;

  // 修改背景颜色
  setBackground(url: string) {
    if (!url) {
      return;
    }
    this.background = url;
  }

  /**
    * 设置或反转提示
    * @param hint
    * @return 修改后的提示开启 / 关闭状态
  */
  setOrToggleShowHint(hint?: string): boolean {
    // 反转提示
    if (!hint) {
      this.showHint = !this.showHint;
      return this.showHint;
    }
    // 开启提示
    if (hint === 'on') {
      this.showHint = true;
    } else if (hint === 'off') {
      this.showHint = false;
    }
    return this.showHint;
  }

  // 重置默认
  reset() {
    this.background = 'black';
    this.showHint = true;
  }
}

export default TerminalConfig;