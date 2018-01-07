import React from 'react';
import classnames from 'classnames';
import BasePropsType from './PropsType';
import Icon from '../icon';
import getDataAttr from '../_util/getDataAttr';
import TouchFeedback from 'rmc-feedback';

export interface TagProps extends BasePropsType {
  prefixCls?: string;
  className?: string;
}

export default class Tag extends React.Component<TagProps, any> {
  static defaultProps = {
    prefixCls: 'ej-tag',
    disabled: false,
    selected: false,
    closable: false,
    small: false,
    onChange() { },
    onClose() { },
    afterClose() { },
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      closed: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.setState({
        selected: nextProps.selected,
      });
    }
  }

  onClick = () => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    const isSelect = this.state.selected;
    this.setState({
      selected: !isSelect,
    }, () => {
      if (onChange) {
        onChange(!isSelect);
      }
    });
  }

  onTagClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.setState({
      closed: true,
    }, this.props.afterClose);
  }

  render() {
    const { children, className, prefixCls, disabled, closable, small, style } = this.props;
    const wrapCls = classnames(className, prefixCls, {
      [`${prefixCls}-normal`]: !disabled && (!this.state.selected || small || closable),
      [`${prefixCls}-small`]: small,
      [`${prefixCls}-active`]: this.state.selected && !disabled && !small && !closable,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-closable`]: closable,
    });

    const closableDom = closable && !disabled && !small ? (
      <TouchFeedback activeClassName={`${prefixCls}-close-active`}>
        <div className={`${prefixCls}-close`} role="button" onClick={this.onTagClose} aria-label="remove tag">
          <Icon type="cross-circle" size="xs" aria-hidden="true" />
        </div>
      </TouchFeedback>
    ) : null;

    return !this.state.closed ? (
      <div {...getDataAttr(this.props)} className={wrapCls} onClick={this.onClick} style={style}>
        <div className={`${prefixCls}-text`}>{children}</div>
        {closableDom}
      </div>
    ) : null;
  }
}
