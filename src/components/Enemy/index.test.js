import React from 'react';
import { shallow } from 'enzyme';
import Enemy from './index';

const setup = () => {
  const props = {
    facing: '',
    stats: {
      health: 10
    }
  };
  const enemy = shallow(<Enemy {...props} />);

  return { props, enemy };
};

describe('Enemy component', () => {
  it('should render without crashing', () => {
    const { enemy } = setup();
    expect(enemy).toHaveLength(1);
  });
});
