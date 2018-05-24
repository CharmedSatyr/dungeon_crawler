import React from 'react';
import Start from './index';
import { shallow } from 'enzyme';

describe('`Player` presentational component', () => {
  it('should render without crashing', () => {
    const start = shallow(<Start />);
    expect(start).toHaveLength(1);
  });
});
