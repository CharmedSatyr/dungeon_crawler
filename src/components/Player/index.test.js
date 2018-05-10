import React from 'react';
import Player from './index';

import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';

describe('Player component', () => {
  const initialState = {
    animation: { player: [] }
  };
  const props = {
    facing: 'south',
    playerAnimation: initialState.animation.player
  };

  const mockStore = configureMockStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render without crashing', () => {
    // Requires full mount to include store since Player
    // is a connected component. Shallow mount won't work
    const player = mount(<Player store={store} {...props} />);
    expect(player.find(Player)).toHaveLength(1);
  });

  it('should have `facing` prop', () => {
    const player = mount(<Player store={store} {...props} />);
    expect(player.props().facing).toBe('south');
  });

  it('should have `playerAnimation` prop', () => {
    const player = mount(<Player store={store} {...props} />);
    expect(player.props().playerAnimation).toEqual([]);
  });
});
