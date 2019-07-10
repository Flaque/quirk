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
