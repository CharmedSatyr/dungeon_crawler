import React from 'react';
import { shallow } from 'enzyme';
import Loot from './index';

const setup = () => {
  const props = {
    variety: {}
  };
  const loot = shallow(<Loot {...props} />);

  return { props, loot };
};

describe('`Loot` component', () => {
  it('should render without crashing', () => {
    const { loot } = setup();
    expect(loot).toHaveLength(1);
  });
});
