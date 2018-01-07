import React from 'react';
import classnames from 'classnames';
import List from '../list';
import Checkbox from './Checkbox';
import { CheckboxItemProps as BasePropsType } from './PropsType';

export interface CheckboxItemProps extends BasePropsType {
  listPrefixCls?: any;
  prefixCls?: string;
  className?: string;
  name?: string;
  wrapLabel?: boolean;
}

const ListItem = List.Item;
function noop() { }

export default class CheckboxItem extends React.Component<CheckboxItemProps, any> {
  static defaultProps = {
    prefixCls: 'ej-checkbox',
    listPrefixCls: 'ej-list',
    checkboxProps: {},
  };

  render() {
    const { listPrefixCls, onChange, disabled, checkboxProps, onClick, ...restProps } = this.props;
    const { prefixCls, className, children } = restProps;
    const wrapCls = classnames(`${prefixCls}-item`, className, {
      [`${prefixCls}-item-disabled`]: disabled === true,
    });

    // Note: if not omit `onChange`, it will trigger twice on check listitem
    if (!disabled) {
      (restProps as any).onClick = onClick || noop;
    }

    const extraProps: any = {};
    ['name', 'defaultChecked', 'checked', 'onChange', 'disabled'].forEach(i => {
      if (i in this.props) {
        extraProps[i] = this.props[i];
      }
    });

    return (
      <ListItem
        {...restProps}
        prefixCls={listPrefixCls}
        className={wrapCls}
        thumb={<Checkbox {...checkboxProps} {...extraProps} />}
      >
        {children}
      </ListItem>
    );
  }
}
