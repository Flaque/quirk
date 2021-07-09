import React from "react";
import theme from "../theme";
import { View, Image, Animated, Easing } from "react-native";

export default class ProgressBar extends React.Component<
  {
    progress: number;
  },
  {
    width: any;
  }
> {
  constructor(props) {
    super(props);
    this.state = { width: new Animated.Value(this.props.progress) };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.progress !== prevProps.progress) {
      Animated.timing(this.state.width, {
        toValue: this.props.progress,
        duration: 200,
        easing: Easing.ease,
      }).start();
    }
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: theme.lightGray,
          height: 32,
          borderRadius: 34,
        }}
      >
        <Animated.View
          style={{
            width: this.state.width.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "1%"],
            }),
            height: 32,
            backgroundColor: theme.pink,
            borderRadius: 34,
          }}
        >
          <Image
            source={require("../../assets/pink/Dook.png")}
            style={{
              width: 32,
              height: 32,
              alignSelf: "flex-end",
            }}
          />
        </Animated.View>
      </View>
    );
  }
}
