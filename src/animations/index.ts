import posed from "react-native-pose";
import { Platform } from "react-native";

export const FadesIn = posed.View({
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -10 },
});

export const FadesInAndShrinks = posed.View({
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -100 },
});

export const BouncyBigOnActive = posed.View({
  active: { scale: 1, transition: { type: "spring", stiffness: 200 } },
  inactive: { scale: 0.5 },
  upcoming: { y: -24 },
});

export const newFadesIn = ({ maxOpacity }) =>
  posed.View({
    visible: { opacity: maxOpacity },
    hidden: { opacity: 0 },
  });

export const newPopsUp = ({ fullHeight, hiddenHeight, popUpScale }) =>
  posed.View({
    peak: {
      height:
        Platform.OS === "ios" ? fullHeight * popUpScale : fullHeight * 0.6,
      transition: { type: "spring", duration: 200 },
    },
    peakNoBounce: {
      height:
        Platform.OS === "ios" ? fullHeight * popUpScale : fullHeight * 0.6,
      transition: { duration: 0, ease: "easeOut" },
    },
    full: {
      height: fullHeight,
      transition: { type: "spring", stiffness: 150 },
    },
    hiddenWiggle: {
      height: hiddenHeight * 1,
      transition: { type: "spring", stiffness: 100 },
    },
    hidden: { height: hiddenHeight * 0.8 },
  });
