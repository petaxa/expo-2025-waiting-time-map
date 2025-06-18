export const getIconUrl = (waitingTime: number | null) => {
  if (waitingTime === null) {
    return "./unknown.png";
  }

  if (waitingTime > 100) {
    return "./crowd-high.png";
  } else if (waitingTime > 30) {
    return "./crowd-mid.png";
  } else {
    return "./crowd-low.png";
  }
};
