import React from 'react';
import App from '../App';
import GameContainer from '../../containers/GameContainer';
import { shallow } from 'enzyme';

describe('`App` component', () => {
  it('should render without crashing', () => {
    const app = shallow(<App />);
    expect(app).toHaveLength(1);
  });

  it('should contain one instance of `Game` component', () => {
    const app = shallow(<App />);
    expect(app.find(GameContainer)).toHaveLength(1);
  });
});
