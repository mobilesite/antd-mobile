import React from 'react';
import Swipeout from 'rc-swipeout';
import classnames from 'classnames';
import BasePropsType from './PropsType';

export interface SwipeActionProps extends BasePropsType {
  prefixCls?: string;
  className?: string;
}

class SwipeAction extends React.Component<SwipeActionProps, any> {
  static defaultProps = {
    prefixCls: 'ej-swipe',
    autoClose: false,
    disabled: false,
    left: [],
    right: [],
    onOpen() { },
    onClose() { },
  };

  render() {
    const {
      className, style, prefixCls, left = [], right = [], autoClose, disabled, onOpen, onClose, children,
    } = this.props;

    const wrapClass = classnames(prefixCls, className);

    return (left.length || right.length) ? (
      <div style={style} className={className}>
        <Swipeout
          prefixCls={prefixCls}
          left={left}
          right={right}
          autoClose={autoClose}
          disabled={disabled}
          onOpen={onOpen}
          onClose={onClose}
        >
          {children}
        </Swipeout>
      </div>
    ) : (
        <div style={style} className={wrapClass}>{children}</div>
      );
  }
}

export default SwipeAction;
