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
weapons.spear = new Weapon('Spear', 3, 7);