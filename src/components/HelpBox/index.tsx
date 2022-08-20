import React from 'react';
import { Col, Row } from 'antd';
import { commandList } from '@/core/command/commandRegister';
/**
 * 帮助提示组件
 */
const HelpBox = () => (
  <div>
    <div>
      ⭐️ 使用 [help 命令英文名] 可以查询某命令的具体用法，如：help search
    </div>
    <div>命令列表：</div>
    {
      commandList?.map((command, cIndex) => (
        <Row gutter={16} key={`${command}-${cIndex}`}>
          <Col span={4}>{command.func}</Col>
          <Col span={4}>{command.name}</Col>
          <Col>{command.desc}</Col>
        </Row>
      ))
    }
  </div>
);

export default HelpBox;