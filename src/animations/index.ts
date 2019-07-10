import posed from "react-native-pose";

export const FadesIn = posed.View({
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
});
