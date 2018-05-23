import React from 'react';
import Start from '../Start';
import { shallow } from 'enzyme';

describe('`Start` component', () => {
  it('should render without crashing', () => {
    const start = shallow(<Start />);
    expect(start).toHaveLength(1);
  });
});
