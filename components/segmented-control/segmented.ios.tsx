import React from 'react';
import { SegmentedControlIOS } from 'react-native';
import BasePropsType from './PropsType';

export interface SegmentedControlProps extends BasePropsType {
  styles?: any;
}

export default class SegmentedControl extends React.Component<SegmentedControlProps, any> {
  static defaultProps = {
    tintColor: '#108ee9',
    selectedIndex: 0,
  };

  render() {
    const { tintColor, disabled, selectedIndex, ...restProps } = this.props;

    return (
      <SegmentedControlIOS
        tintColor={tintColor}
        selectedIndex={selectedIndex}
        {...restProps}
        enabled={!disabled}
      />
    );
  }
}
