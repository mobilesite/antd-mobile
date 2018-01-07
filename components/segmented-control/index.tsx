import React from 'react';
import classnames from 'classnames';
import BasePropsType from './PropsType';
import TouchFeedback from 'rmc-feedback';

export interface SegmentedControlProps extends BasePropsType {
  prefixCls?: string;
  className?: string;
}

export default class SegmentedControl extends React.Component<SegmentedControlProps, any> {
  static defaultProps = {
    prefixCls: 'ej-segment',
    selectedIndex: 0,
    disabled: false,
    values: [],
    onChange() { },
    onValueChange() { },
    style: {},
    tintColor: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex: nextProps.selectedIndex,
      });
    }
  }

  onClick(e, index, value) {
    const { disabled, onChange, onValueChange } = this.props;
    if (!disabled && this.state.selectedIndex !== index) {
      // just do a mock so that the api to be the same as react-native
      e.nativeEvent = e.nativeEvent ? e.nativeEvent : {};
      e.nativeEvent.selectedSegmentIndex = index;
      e.nativeEvent.value = value;
      if (onChange) {
        onChange(e);
      }
      if (onValueChange) {
        onValueChange(value);
      }
      this.setState({
        selectedIndex: index,
      });
    }
  }

  renderSegmentItem(idx, value, selected) {
    const { prefixCls, disabled, tintColor } = this.props;

    const itemCls = classnames(`${prefixCls}-item`, {
      [`${prefixCls}-item-selected`]: selected,
    });

    const itemStyle = {
      color: selected ? '#fff' : tintColor,
      backgroundColor: selected ? tintColor : 'transparent',
      borderColor: tintColor,
    };

    const activeInnerStyle: any = tintColor ? {
      backgroundColor: tintColor,
    } : {};

    return (
      <TouchFeedback
        key={idx}
        disabled={disabled}
        activeClassName={`${prefixCls}-item-active`}
      >
        <div
          className={itemCls}
          style={itemStyle}
          role="tab"
          aria-selected={selected && !disabled}
          aria-disabled={disabled}
          onClick={disabled ? undefined : (e) => this.onClick(e, idx, value)}
        >
          <div className={`${prefixCls}-item-inner`} style={activeInnerStyle} />
          {value}
        </div>
      </TouchFeedback>
    );
  }

  render() {
    const { className, prefixCls, style, disabled, values = [] } = this.props;

    const wrapCls = classnames(className, prefixCls, {
      [`${prefixCls}-disabled`]: disabled,
    });

    return (
      <div className={wrapCls} style={style} role="tablist">
        {values.map((value, idx) => this.renderSegmentItem(idx, value, idx === this.state.selectedIndex))}
      </div>
    );
  }
}
