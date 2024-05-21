const getLightArmorClass = (armorModifier: number, dexModifier: number) => {
  return armorModifier + dexModifier;
};

export const getPaddedArmorClass = (dexModifier: number) => {
  return getLightArmorClass(11, dexModifier);
};

export const getLeatherArmorClass = (dexModifier: number) => {
  return getLightArmorClass(11, dexModifier);
};

export const getStuddedLeatherArmorClass = (dexModifier: number) => {
  return getLightArmorClass(12, dexModifier);
};

const getMediumArmorClass = (armorModifier: number, dexModifier: number) => {
  return armorModifier + Math.min(dexModifier, 2);
};
export const getHideArmorClass = (dexModifier: number) => {
  return getMediumArmorClass(12, dexModifier);
};

export const getChainShirtArmorClass = (dexModifier: number) => {
  return getMediumArmorClass(13, dexModifier);
};

export const getScaleMailArmorClass = (dexModifier: number) => {
  return getMediumArmorClass(14, dexModifier);
};

export const getBreastplateArmorClass = (dexModifier: number) => {
  return getMediumArmorClass(14, dexModifier);
};

export const getHalfPlateArmorClass = (dexModifier: number) => {
  return getMediumArmorClass(15, dexModifier);
};

export const getRingMailArmorClass = () => {
  return 14;
};

export const getChainMailArmorClass = () => {
  return 16;
};

export const getSplintArmorClass = () => {
  return 17;
};

export const getPlateArmorClass = () => {
  return 18;
};

export const getUnarmoredDefenseArmorClass = (
    firstModifier: number,
    secondModifier: number,
) => {
  return 10 + firstModifier + secondModifier;
};
