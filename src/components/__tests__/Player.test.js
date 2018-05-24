import React from 'react';
import Player from './index';
import { shallow } from 'enzyme';

import testImg from '../../resources/Player/alt-heroine-dagger.png';

describe('`Player` presentational component', () => {
  const props = {
    cellSide: 64,
    playerClass: 'move-east',
    spriteSheet: testImg,
    backgroundPositionY: 0,
  };

  it('should render without crashing', () => {
    const player = shallow(<Player {...props} />);
    expect(player).toHaveLength(1);
  });
});
