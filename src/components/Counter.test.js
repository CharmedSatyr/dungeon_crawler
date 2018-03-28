import React from 'react';
import { shallow, mount } from 'enzyme';
import Counter, { ShowCount, Buttons } from './Counter';

const setup = (count = 0) => {
  const props = {
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
    count
  };

  const counter = mount(<Counter {...props} />);
  const showcount = shallow(<ShowCount count={props.count} />);
  const buttons = shallow(
    <Buttons onIncrement={props.onIncrement} onDecrement={props.onDecrement} />
  );

  return {
    buttons,
    counter,
    props,
    showcount
  };
};

describe('Counter component', () => {
  it('should render without crashing', () => {
    const { counter } = setup();
    expect(counter).toHaveLength(1);
  });

  it('should render ShowCount and Buttons without crashing', () => {
    const { counter, props } = setup();
    expect(
      counter.contains(
        <div>
          <ShowCount count={props.count} />
          <Buttons onIncrement={props.onIncrement} onDecrement={props.onDecrement} />
        </div>
      )
    );
  });

  describe('ShowCount', () => {
    it('should render without crashing', () => {
      const { showcount } = setup();
      expect(showcount).toHaveLength(1);
    });

    it('should display count from props', () => {
      const { showcount, props } = setup(7);
      expect(showcount.find('h1').text()).toMatch('Count: ' + props.count);
    });
  });

  describe('Buttons', () => {
    it('should render without crashing', () => {
      const { buttons } = setup();
      expect(buttons).toHaveLength(1);
    });

    it('first button (+) should call onIncrement', () => {
      const { buttons, props } = setup();
      buttons
        .find('button')
        .at(0)
        .simulate('click');
      expect(
        buttons
          .find('button')
          .at(0)
          .text()
      ).toMatch('+');
      expect(props.onIncrement.mock.calls.length).toEqual(1);
    });

    it('second button (-) should call onDecrement', () => {
      const { buttons, props } = setup();
      buttons
        .find('button')
        .at(1)
        .simulate('click');
      expect(
        buttons
          .find('button')
          .at(1)
          .text()
      ).toMatch('-');
      expect(props.onDecrement.mock.calls.length).toEqual(1);
    });
  });
});
