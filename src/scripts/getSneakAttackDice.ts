export const getSneakAttackDice = (level: number) => {
  if (level < 3) {
    return "1d6";
  } else if (level < 5) {
    return "2d6";
  } else if (level < 7) {
    return "3d6";
  } else if (level < 9) {
    return "4d6";
  } else if (level < 11) {
    return "5d6";
  } else if (level < 13) {
    return "6d6";
  } else if (level < 15) {
    return "7d6";
  } else if (level < 17) {
    return "8d6";
  } else if (level < 19) {
    return "9d6";
  } else {
    return "10d6";
  }
};
