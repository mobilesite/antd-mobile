import React from 'react';
import classnames from 'classnames';
import TouchFeedback from 'rmc-feedback';

export class KeyboardItem extends React.Component<any, any> {
  static defaultProps = {
    prefixCls: 'ej-number-keyboard',
    onClick: () => {},
    disabled: false,
  };

  render () {
    const { prefixCls, onClick, className, disabled, children, tdRef, ...restProps } = this.props;
    let value = children;
    if (className === 'keyboard-delete') {
      value = 'delete';
    } else if (className === 'keyboard-hide') {
      value = 'hide';
    } else if (className === 'keyboard-confirm') {
      value = 'confirm';
    }

    const wrapCls = classnames(`${prefixCls}-item`, className);
    return (<TouchFeedback activeClassName={`${prefixCls}-item-active`}>
      <td
        ref={tdRef}
        onClick={(e) => { onClick(e, value); }}
        className={wrapCls}
        {...restProps}
      >
        {children}
      </td>
    </TouchFeedback>);
  }
}

class CustomKeyboard extends React.Component<any, any> {
  static defaultProps = {
    prefixCls: 'ej-number-keyboard',
  };

  linkedInput: any;
  antmKeyboard: any;
  confirmDisabled: boolean;
  confirmKeyboardItem: any;

  onKeyboardClick = (e, value) => {
    e.nativeEvent.stopImmediatePropagation();
    if (value === 'confirm' && this.confirmDisabled) {
      return null;
    } else {
      if (this.linkedInput) {
        this.linkedInput.onKeyboardClick(value);
      }
    }
  }

  renderKeyboardItem = (item, index) => {
    return (<KeyboardItem onClick={this.onKeyboardClick} key={`item-${item}-${index}`}>{item}</KeyboardItem>);
  }
  render() {
    const { prefixCls, confirmLabel } = this.props;

    const wrapperCls = classnames(`${prefixCls}-wrapper`, `${prefixCls}-wrapper-hide`);

    return (<div
      className={wrapperCls}
      ref={el => this.antmKeyboard = el}
    >
      <table>
        <tbody>
          <tr>
            {['1', '2', '3'].map((item, index) => { return this.renderKeyboardItem(item, index); })}
            <KeyboardItem className="keyboard-delete" rowSpan={2} onClick={this.onKeyboardClick} />
          </tr>
          <tr>
            {['4', '5', '6'].map((item, index) => { return this.renderKeyboardItem(item, index); })}
          </tr>
          <tr>
            {['7', '8', '9'].map((item, index) => { return this.renderKeyboardItem(item, index); })}
            <KeyboardItem
              className="keyboard-confirm"
              rowSpan={2}
              onClick={this.onKeyboardClick}
              tdRef={el => this.confirmKeyboardItem = el}
            >
              {confirmLabel}
            </KeyboardItem>
          </tr>
          <tr>
            {['.', '0'].map((item, index) => { return this.renderKeyboardItem(item, index); })}
            <KeyboardItem className="keyboard-hide" onClick={this.onKeyboardClick} />
          </tr>
        </tbody>
      </table>
    </div>);
  }
}

export default CustomKeyboard;
