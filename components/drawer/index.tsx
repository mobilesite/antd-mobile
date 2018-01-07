import React from 'react';
import RcDrawer from 'rc-drawer';
import { DrawerWebProps } from './PropsType';

export default class Drawer extends React.Component<DrawerWebProps, any> {
  static defaultProps = {
    prefixCls: 'ej-drawer',
    enableDragHandle: false,
  };
  render() {
    return <RcDrawer {...this.props} />;
  }
}
