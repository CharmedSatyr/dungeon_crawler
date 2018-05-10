import React from 'react';
import App from '../App';
import Game from '../../containers/Game';
import { shallow } from 'enzyme';

describe('`App` component', () => {
  it('should render without crashing', () => {
    const app = shallow(<App />);
    expect(app).toHaveLength(1);
  });

  it('should contain one instance of `Game` component', () => {
    const app = shallow(<App />);
    expect(app.find(Game)).toHaveLength(1);
  });
});
