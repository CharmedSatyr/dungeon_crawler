import React from 'react';
import * as c from '../../constants/settings';
import heroine from './Heroine.png';
import few from './Few.png';
import boss from './Boss.png';
import spacebar from './spacebar.png';
import wasd from './wasd.png';
import arrowkeys from './arrowkeys.png';

const Start = ({ fn }) => (
  <div
    className="Start"
    style={{
      height: c.CELL_SIDE * 9,
      width: c.CELL_SIDE * 14,
    }}
  >
    <header>
      <h2>
        Find Prince Few
        <br />
        <small>a very bad game from Charmed.Tech</small>
      </h2>
    </header>
    <div className="character-portraits">
      <img alt="hero" className="hero-image" src={heroine} />
      <img alt="enemy boss" className="boss-image" src={boss} />
      <img alt="Prince Few" className="few-image" src={few} />
    </div>
    <div className="controls">
      <h4>Controls:</h4>
      <p>Spacebar changes weapons</p>
      <img alt="spacebar" src={spacebar} style={{ width: 150 }} />
      <p>WASD or arrow keys to move and attack</p>
      <div className="movement-keys">
        <img alt="wasd keys" src={wasd} style={{ width: 100 }} />
        <img alt="arrow keys" src={arrowkeys} style={{ width: 100 }} />
      </div>
    </div>
    <br />
    <br />
    <button onClick={fn}>Click Start to Begin</button>
  </div>
);

export default Start;
