import React from 'react';
import * as c from '../../constants/settings';
import logo from './logo.svg';
import heroine from './Heroine.png';
import few from './Few.png';
import boss from './Boss.png';

const Start = ({ fn }) => (
  <div
    className="Start"
    style={{
      height: c.CELL_SIDE * 10,
      width: c.CELL_SIDE * 14,
    }}
  >
    <header>
      <img src={logo} className="React-logo" alt="logo" />
      <h2>
        Rescue Prince Few!
        <br />
        <small>a very bad game from Charmed.Tech</small>
      </h2>
    </header>
    <div className="character-portraits">
      <img alt="hero" className="hero-image" src={heroine} />
      <img alt="enemy boss" className="boss-image" src={boss} />
      <img alt="Prince Few" className="few-image" src={few} />
    </div>
    <h4>Controls:</h4>
    <h5>Spacebar changes weapons</h5>
    <h5>WASD or arrow keys to move and attack</h5>
    <button onClick={fn}>Click Start to Begin</button>
  </div>
);

export default Start;
