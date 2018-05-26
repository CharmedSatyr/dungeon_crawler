import React from 'react';
import * as c from '../constants/settings';
import * as l from '../constants/loot';
import PropTypes from 'prop-types';

import tiles from '../resources/loot/Loot.png';

/*** Loot Spritesheet Background Positions ***/
// Barrels
export const emptyBarrelPosition = '0 0';
export const fullBarrelPosition = `${-c.CELL_SIDE}px 0`;

// Weapons
export const spearPosition = `0 ${-c.CELL_SIDE}px`;
export const dragonSpearPosition = `${-c.CELL_SIDE}px ${-c.CELL_SIDE}px`;

// Gold
export const goldCoinPosition = `0 ${-3 * c.CELL_SIDE}px`;
export const goldHandfulPosition = `${-c.CELL_SIDE}px ${-3 * c.CELL_SIDE}px`;
export const goldNuggetPosition = `${-2 * c.CELL_SIDE}px ${-3 * c.CELL_SIDE}px`;
export const goldSmPilePosition = `${-3 * c.CELL_SIDE}px ${-3 * c.CELL_SIDE}px`;
export const goldPilePosition = `${-4 * c.CELL_SIDE}px ${-3 * c.CELL_SIDE}px`;
export const goldPouchPosition = `${-5 * c.CELL_SIDE}px ${-3 * c.CELL_SIDE}px`;
export const goldStashPosition = `${-6 * c.CELL_SIDE}px ${-3 * c.CELL_SIDE}px`;

// Fallback
export const warningSquarePosition = `0 ${-c.CELL_SIDE}px`;

export const setBGPosition = variety => {
  // Barrels
  if (variety === l.fullBarrel) {
    return fullBarrelPosition;
  }

  if (variety === l.emptyBarrel) {
    return emptyBarrelPosition;
  }

  // Weapons
  if (variety.item && variety.item === l.weapons.spear) {
    return spearPosition;
  }

  if (variety.item && variety.item === l.weapons.dragonSpear) {
    return dragonSpearPosition;
  }

  // Gold
  if (variety === l.gold.coin) {
    return goldCoinPosition;
  }

  if (variety === l.gold.handful) {
    return goldHandfulPosition;
  }

  if (variety === l.gold.nugget) {
    return goldNuggetPosition;
  }

  if (variety === l.gold.sm_pile) {
    return goldSmPilePosition;
  }

  if (variety === l.gold.pile) {
    return goldPilePosition;
  }

  if (variety === l.gold.pouch) {
    return goldPouchPosition;
  }

  if (variety === l.gold.stash) {
    return goldStashPosition;
  }

  return warningSquarePosition;
};

const Loot = ({ variety }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${tiles})`,
        backgroundPosition: setBGPosition(variety),
        height: c.CELL_SIDE,
        width: c.CELL_SIDE,
      }}
    />
  );
};

export default Loot;

Loot.propTypes = {
  variety: PropTypes.object,
};
