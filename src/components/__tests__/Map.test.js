import React from 'react';
import Map from '../Map';
import { shallow } from 'enzyme';

describe('`Map` component', () => {
  const props = {
    cells: [{}]
  };

  it('should render without crashing', () => {
    const map = shallow(<Map {...props} />);
    expect(map).toHaveLength(1);
  });
});
