import React from 'react';
import { shallow } from 'enzyme';
import Portal from '../Portal';

describe('`Portal` component', () => {
  it('should render without crashing', () => {
    const props = { open: true };
    const portal = shallow(<Portal {...props} />);
    expect(portal).toHaveLength(1);
  });
});
