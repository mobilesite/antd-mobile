import React from 'react';
import Dialog from 'rmc-dialog';
import classnames from 'classnames';
import { ModalProps as BasePropsType, ModalComponent } from './PropsType';
import TouchFeedback from 'rmc-feedback';

export interface ModalProps extends BasePropsType {
  prefixCls?: string;
  transitionName?: string;
  maskTransitionName?: string;
  className?: string;
  wrapClassName?: string;
  wrapProps?: {};
  platform?: string;
}

export default class Modal extends ModalComponent<ModalProps, any> {
  static defaultProps = {
    prefixCls: 'ej-modal',
    transparent: false,
    popup: false,
    animationType: 'slide-down',
    animated: true,
    style: {},
    onShow() { },
    footer: [],
    closable: false,
    operation: false,
    platform: 'ios',
  };

  renderFooterButton(button, prefixCls, i) {
    let buttonStyle = {};
    if (button.style) {
      buttonStyle = button.style;
      if (typeof buttonStyle === 'string') {
        const styleMap = {
          cancel: {},
          default: {},
          destructive: { color: 'red' },
        };
        buttonStyle = styleMap[buttonStyle] || {};
      }
    }

    const onClickFn = function (e) {
      e.preventDefault();
      if (button.onPress) {
        button.onPress();
      }
    };

    return (
      <TouchFeedback activeClassName={`${prefixCls}-button-active`} key={i}>
        <a className={`${prefixCls}-button`} role="button" style={buttonStyle} onClick={onClickFn}>
          {button.text || `Button`}
        </a>
      </TouchFeedback>
    );
  }

  render() {
    let {
      prefixCls, className, wrapClassName, transitionName, maskTransitionName, style, platform,
      footer = [], operation, animated, transparent, popup, animationType, ...restProps,
    } = this.props;

    const btnGroupClass = classnames(
      `${prefixCls}-button-group-${footer.length === 2 && !operation ? 'h' : 'v'}`,
      `${prefixCls}-button-group-${operation ? 'operation' : 'normal'}`,
    );
    const footerDom = footer.length ? <div className={btnGroupClass} role="group">
      {footer.map((button: any, i) => this.renderFooterButton(button, prefixCls, i))}
    </div> : null;

    // popup 模式自动禁止 transparent
    if (popup) {
      transparent = false;
    }

    let transName;
    let maskTransName;
    if (animated) {
      if (transparent) {
        transName = maskTransName = 'ej-fade';
      } else {
        transName = maskTransName = 'ej-slide-up';
      }
      if (popup) {
        transName = animationType === 'slide-up' ? 'ej-slide-up' : 'ej-slide-down';
        maskTransName = 'ej-fade';
      }
    }

    const wrapCls = classnames(wrapClassName, {
      [`${prefixCls}-wrap-popup`]: popup,
    });
    const cls = classnames(className, {
      [`${prefixCls}-transparent`]: transparent,
      [`${prefixCls}-popup`]: popup,
      [`${prefixCls}-popup-${animationType}`]: popup && animationType,
      [`${prefixCls}-android`]: platform === 'android',
    });

    return (
      <Dialog
        {...restProps}
        prefixCls={prefixCls}
        className={cls}
        wrapClassName={wrapCls}
        transitionName={transitionName || transName}
        maskTransitionName={maskTransitionName || maskTransName}
        style={style}
        footer={footerDom}
      />
    );
  }
}
