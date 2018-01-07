import React from 'react';
import classnames from 'classnames';
import { CardHeaderProps as BasePropsType } from './PropsType';

export interface CardHeaderProps extends BasePropsType {
  prefixCls?: string;
  className?: string;
}

export default class CardHeader extends React.Component<CardHeaderProps, any> {
  static defaultProps = {
    prefixCls: 'ej-card',
    thumbStyle: {},
  };

  render() {
    const { prefixCls, className, title, thumb, thumbStyle, extra, ...restProps } = this.props;
    const wrapCls = classnames(`${prefixCls}-header`, className);

    return (
      <div className={wrapCls} {...restProps}>
        <div className={`${prefixCls}-header-content`}>
          {typeof thumb === 'string' ? <img style={thumbStyle} src={thumb} /> : thumb}
          {title}
        </div>
        {extra ? <div className={`${prefixCls}-header-extra`}>{extra}</div> : null}
      </div>
    );
  }
}
