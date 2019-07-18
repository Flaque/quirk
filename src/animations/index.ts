import posed from "react-native-pose";

export const FadesIn = posed.View({
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
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
      height: fullHeight * popUpScale,
    },
    full: {
      height: fullHeight,
      transition: { type: "spring", stiffness: 150 },
    },
    hiddenWiggle: {
      height: hiddenHeight * 1,
      transition: { type: "spring", stiffness: 150 },
    },
    hidden: { height: hiddenHeight * 0.8 },
  });
