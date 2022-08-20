# YIndex-React

YIndex React版，旨在开发一个可以复用的Web终端。  
原项目地址：[YuIndex - 极客范儿的浏览器主页-by鱼皮](https://github.com/liyupi/yuindex)

## 技术栈

### 前端

- React
- Ant Design 前端组件库
- React-Router React路由
- Mobx -状态管理
- TypeScript 类型控制
- Eslint 代码规范控制
- Prettier 美化代码

## 较原版项目的区别？
1. 因为使用React作为开发框架，所以在开源库上的选择与原Vue项目不同，包括状态管理以及路由库等。
2. 为了能进一步的拓展组件的复用性，新增了添加外部命令的方式（详见`pages/yuTerminal/index.tsx`文件）
3. 超链接文本组件重构，使用React风格组件，实现上参考了Markdown语法（详见`components/SmartTextView/index.tsx`）

## 本地开发调试
本项目基于creat-react-app创建，如需改写Webpack配置，请参考`config-overrides.js`文件。

### `npm start`
启动项目

### `npm run build`
打包构建产物

## 致谢

感谢原作者[鱼皮](https://github.com/liyupi)的支持，感谢大佬的开源分享。
