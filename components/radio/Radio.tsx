import React from 'react';
import RcCheckbox from 'rc-checkbox';
import { RadioProps as BasePropsType } from './PropsType';
import classnames from 'classnames';

export interface RadioProps extends BasePropsType {
  prefixCls?: string;
  listPrefixCls?: string;
  className?: string;
}

export default class Radio extends React.Component<RadioProps, any> {
  static RadioItem: any;

  static defaultProps = {
    prefixCls: 'ej-radio',
    wrapLabel: true,
  };

  render() {
    const { className, style, ...restProps } = this.props;
    const { prefixCls, children } = restProps;
    const wrapCls = classnames(`${prefixCls}-wrapper`, className);
    if ('class' in restProps) {
      // Todo https://github.com/developit/preact-compat/issues/422
      /* tslint:disable:no-string-literal */
      delete restProps['class'];
    }
    const mark = (
      <label className={wrapCls} style={style}>
        <RcCheckbox {...restProps} type="radio" />
        {children}
      </label>
    );
    if (this.props.wrapLabel) {
      return mark;
    }
    return <RcCheckbox {...this.props} type="radio" />;
  }
}
