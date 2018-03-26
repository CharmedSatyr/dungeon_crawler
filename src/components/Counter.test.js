import React from 'react';
import { shallow } from 'enzyme';
import { ShowCount, Buttons } from './Counter';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Counter from './Counter';

Enzyme.configure({ adapter: new Adapter() });

const setup = (count = 0) => {
  const props = {
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
    count
  };

  const wrapper = shallow(<Counter {...props} />);
  const enzymeWrapper = mount(<Counter {...props} />);

  const showcount = shallow(<ShowCount count={count} />);
  return {
    props,
    wrapper,
    showcount
  };
};

describe('Counter component', () => {
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
});
