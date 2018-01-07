import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import closest from '../_util/closest';
import { Action } from './PropsType';

export default function alert(
  title, message, actions = [{ text: '确定' }], platform = 'ios',
) {
  if (!title && !message) {
    // console.log('Must specify either an alert title, or message, or both');
    return {
      close: () => {},
    };
  }

  let div: any = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  const footer = actions.map((button: Action) => {
    const orginPress = button.onPress || function () {};
    button.onPress = () => {
      const res = orginPress();
      if (res && res.then) {
        res.then(() => {
          close();
        });
      } else {
        close();
      }
    };
    return button;
  });

  const prefixCls = 'ej-modal';

  function onWrapTouchStart(e) {
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, `.${prefixCls}-footer`);
    if (!pNode) {
      e.preventDefault();
    }
  }

  ReactDOM.render(
    <Modal
      visible
      transparent
      title={title}
      transitionName="ej-zoom"
      closable={false}
      maskClosable={false}
      footer={footer}
      maskTransitionName="ej-fade"
      platform={platform}
      wrapProps={{ onTouchStart: onWrapTouchStart }}
    >
      <div className={`${prefixCls}-alert-content`}>{message}</div>
    </Modal>, div,
  );

  return {
    close,
  };
}
