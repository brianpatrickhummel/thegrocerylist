import React from "react";
import { Spin, Icon } from "antd";

// Ant Design Loading Spinner Component
const antIcon = <Icon type="loading" style={{ fontSize: 80 }} spin />;

export default () => {
  return <Spin indicator={antIcon} />;
};
