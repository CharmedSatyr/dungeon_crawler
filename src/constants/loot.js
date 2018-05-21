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

export const weapons = {};

// Weapon constructor
class Weapon {
  constructor(name, min, max) {
    this.name = name;
    this.min_damage = min;
    this.max_damage = max;
  }
}

weapons.fists = new Weapon('Fists', 1, 3);
weapons.dagger = new Weapon('Dagger', 3, 5);
weapons.spear = new Weapon('Spear', 4, 9);
weapons.trident = new Weapon('Dragon Trident', 7, 10);

// Barrel constructor
class Barrel {
  constructor(full) {
    this.barrel = { full };
  }
}

export const fullBarrel = new Barrel(true);
export const emptyBarrel = new Barrel(false);
