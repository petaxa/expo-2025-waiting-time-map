import type { WaitTime } from "./parseWaitTime";

export const getIconUrl = (waitingTime: WaitTime) => {
  switch (waitingTime.status) {
    case "stopped":
      return "./stopped.png";
    case "error":
      return "./unknown.png";
    case "no-info":
      return "./no-info.png";
    case "only-reservation":
      return "./stopped.png";
    case "normal":
      if (waitingTime.minutes > 100) {
        return "./crowd-high.png";
      } else if (waitingTime.minutes > 30) {
        return "./crowd-mid.png";
      } else {
        return "./crowd-low.png";
      }
  }
};
