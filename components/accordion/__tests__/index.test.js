import React from 'react';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Accordion from '../index';

describe('Accordion', () => {
  it('match snapshot', () => {
    const wrapper = render(
      <Accordion>
        <Accordion.Panel header="标题一">
          内容一
        </Accordion.Panel>
        <Accordion.Panel header="标题二">
          内容二
        </Accordion.Panel>
      </Accordion>,
    );
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const wrapper = mount(
      <Accordion>
        <Accordion.Panel header="标题一">
          内容一
        </Accordion.Panel>
        <Accordion.Panel header="标题二">
          内容二
        </Accordion.Panel>
      </Accordion>,
    );
    expect(wrapper.find('.ej-accordion')).toHaveLength(1);
  });

  it('renders accordion prop correctly', () => {
    const wrapper = mount(
      <Accordion accordion>
        <Accordion.Panel header="标题一">
          内容一
        </Accordion.Panel>
        <Accordion.Panel header="标题二">
          内容二
        </Accordion.Panel>
      </Accordion>,
    );
    // accordion props make only one active panel
    wrapper.find('.ej-accordion-header').at(0).simulate('click');
    wrapper.find('.ej-accordion-header').at(1).simulate('click');
    expect(wrapper.find('.ej-accordion-item').at(1).hasClass('ej-accordion-item-active')).toBe(true);
  });
});
