/* tslint:disable:no-switch-case-fall-through */
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import closest from '../_util/closest';

export default function prompt(
  title, message, callbackOrActions,
  type = 'default', defaultValue = '', placeholders = ['', ''],
  platform = 'ios',
) {
  if (!callbackOrActions) {
    // console.log('Must specify callbackOrActions');
    return {
      close: () => {},
    };
  }

  const prefixCls = 'ej-modal';

  let data: any = {};

  function onChange(e) {
    const target = e.target;
    const inputType = target.getAttribute('type');
    data[inputType] =  target.value;
  }

  let inputDom;

  const focusFn = function(input) {
    setTimeout(() => {
      if (input) {
        input.focus();
      }
    }, 500);
  };

  switch (type) {
    case 'login-password':
      inputDom = (
        <div className={`${prefixCls}-input-container`}>
          <div className={`${prefixCls}-input`}>
            <label>
              <input
                type="text"
                value={data.text}
                defaultValue={defaultValue}
                ref={input => focusFn(input)}
                onChange={onChange}
                placeholder={placeholders[0]}
              />
            </label>
          </div>
          <div className={`${prefixCls}-input`}>
            <label>
              <input
                type="password"
                value={data.password}
                defaultValue=""
                onChange={onChange}
                placeholder={placeholders[1]}
              />
            </label>
          </div>
        </div>
      );
      break;
    case 'secure-text':
      inputDom = (
        <div className={`${prefixCls}-input-container`}>
          <div className={`${prefixCls}-input`}>
            <label>
              <input
                type="password"
                value={data.password}
                defaultValue=""
                ref={input => focusFn(input)}
                onChange={onChange}
                placeholder={placeholders[0]}
              />
            </label>
          </div>
        </div>
      );
      break;
    case 'default':
    default:
      inputDom = (
        <div className={`${prefixCls}-input-container`}>
          <div className={`${prefixCls}-input`}>
            <label>
              <input
                type="text"
                value={data.text}
                defaultValue={defaultValue}
                ref={input => focusFn(input)}
                onChange={onChange}
                placeholder={placeholders[0]}
              />
            </label>
          </div>
        </div>
      );
      break;
  }

  let content = (
    <div>
      {message}
      {inputDom}
    </div>
  );

  let div: any = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function getArgs(func) {
    const text = data.text || defaultValue || '';
    const password = data.password || '';
    if (type === 'login-password') {
      return func(text, password);
    } else if (type === 'secure-text') {
      return func(password || defaultValue);
    }
    return func(text);
  }

  let actions;
  if (typeof callbackOrActions === 'function') {
    actions = [
      { text: '取消' },
      { text: '确定', onPress: () => { getArgs(callbackOrActions); } },
    ];
  } else {
    actions = callbackOrActions.map(item => {
      return {
        text: item.text,
        onPress: () => {
          if (item.onPress) {
            return getArgs(item.onPress);
          }
        },
      };
    });
  }

  const footer = actions.map((button) => {
    const orginPress = button.onPress || function() {};
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

  function onWrapTouchStart(e) {
    // exclude input element for focus
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, `.${prefixCls}-content`);
    if (!pNode) {
      e.preventDefault();
    }
  }

  ReactDOM.render(
    <Modal
      visible
      transparent
      prefixCls={prefixCls}
      title={title}
      closable={false}
      maskClosable={false}
      transitionName="ej-zoom"
      footer={footer}
      maskTransitionName="ej-fade"
      platform={platform}
      wrapProps={{ onTouchStart: onWrapTouchStart }}
    >
      <div className={`${prefixCls}-propmt-content`}>{content}</div>
    </Modal>, div,
  );

  return {
    close,
  };
}
