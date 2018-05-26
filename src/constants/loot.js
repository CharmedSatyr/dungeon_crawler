/***
 * These items are available in the game, including
 * Gold,
 * Potions, and
 * Weapons.
 *
 * Both the Player and Enemies might use items (especially weapons)
 * from this list.
 *
 ***/

// Weapon constructor
class Weapon {
  constructor(name, min, max) {
    this.name = name;
    this.min_damage = min;
    this.max_damage = max;
  }
}

export const weapons = {};
weapons.fists = new Weapon('Fists', 1, 3);
weapons.dagger = new Weapon('Dagger', 3, 5);
weapons.spear = new Weapon('Spear', 4, 9);
weapons.dragonSpear = new Weapon('Dragon Spear', 7, 10);
weapons.trident = new Weapon('Trident', 6, 11);

// Gold constructor
class Gold {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

export const gold = {};
gold.coin = new Gold('gold coin', 1);
gold.handful = new Gold('handful of gold coins', 4);
gold.nugget = new Gold('large gold nugget', 5);
gold.sm_pile = new Gold('pile of small gold nuggets', 8);
gold.pile = new Gold('pile of gold nuggets', 18);
gold.pouch = new Gold('pouch-worth of proper gold coins', 12);
gold.stash = new Gold('generous stash of gold coins', 22);

// Barrel constructor
class Barrel {
  constructor(full) {
    this.barrel = { full };
  }
}

export const fullBarrel = new Barrel(true);
export const emptyBarrel = new Barrel(false);
