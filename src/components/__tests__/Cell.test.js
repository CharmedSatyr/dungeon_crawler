import React from 'react';
import { shallow } from 'enzyme';

import Cell from '../Cell';

describe('`Cell` presentational component', () => {
  it('should render without crashing', () => {
    const props = {
      backgroundImage: 'url("../../resources/cell/grass.png")',
      backgroundPosition: '0 0',
      cellSide: 64,
    };
    const cell = shallow(<Cell {...props} />);
    expect(cell).toHaveLength(1);
  });
});
