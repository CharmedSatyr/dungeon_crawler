import React from 'react';
import PlayerPanel from '../PlayerPanel';
import { shallow } from 'enzyme';

describe('PlayerPanel component', () => {
  const props = {
    stats: {
      level: 1,
      experience: 0,
      health: {
        current: 10,
        max: 10
      },
      weapon: {
        name: 'fists'
      }
    }
  };

  it('should render without crashing', () => {
    const playerpanel = shallow(<PlayerPanel {...props} />);
    expect(playerpanel).toHaveLength(1);
  });
});
