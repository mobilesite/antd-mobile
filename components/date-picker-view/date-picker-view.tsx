import React from 'react';
import PropTypes from 'prop-types';
import RCDatePicker from 'rmc-date-picker/lib/DatePicker';
import tsPropsType from './PropsType';
import { getComponentLocale } from '../_util/getLocale';

export default class DatePickerView extends React.Component<tsPropsType, any> {
  static defaultProps = {
    mode: 'datetime',
    extra: '请选择',
    prefixCls: 'ej-picker',
    pickerPrefixCls: 'ej-picker-col',
    minuteStep: 1,
    use12Hours: false,
  };

  static contextTypes = {
    antLocale: PropTypes.object,
  };

  render() {
    const { props, context } = this;
    const locale = getComponentLocale(props, context, 'DatePickerView', () => require('./locale/zh_CN'));

    // DatePicker use `defaultDate`, maybe because there are PopupDatePicker inside? @yiminghe
    // Here Use `date` instead of `defaultDate`, make it controlled fully.
    return (
      <RCDatePicker
        {...props}
        locale={locale}
        date={props.value}
        onDateChange={props.onChange}
        onValueChange={props.onValueChange}
        onScrollChange={props.onScrollChange}
      />
    );
  }
}
