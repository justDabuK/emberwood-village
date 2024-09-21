import type { Creature } from "../../scripts/cheatSheetTypes.ts";
import type { Component } from "vue";

export type CreatureComponentMap = {
  creatureList: Creature[];
  component: Component;
  knownSpellNameList?: string[];
};
