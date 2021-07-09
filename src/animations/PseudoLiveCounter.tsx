import React from "react";
import { Text } from "react-native";

/**
 * This gives the impression of a social-proof number being "live" without
 * us having to actually poll the number a bunch.
 */
export default class PseudoLiveCounter extends React.Component<
  {
    value: number;
    style?: any;
  },
  {
    additions: number;
  }
> {
  state = {
    additions: 0,
  };

  // Wobbles mostly in the upward direction
  wobble = () => {
    this.setState(prevState => {
      return {
        additions: prevState.additions + Math.floor(Math.random() * 4 - 1),
      };
    });
  };

  componentDidMount() {
    setTimeout(this.wobble, 1000);
    setTimeout(this.wobble, 4000);
    setTimeout(this.wobble, 10000);
    setTimeout(this.wobble, 20000);
    setTimeout(this.wobble, 40000);
    setTimeout(this.wobble, 80000);
    setTimeout(this.wobble, 120000);
  }

  render() {
    return (
      <Text style={this.props.style}>
        {this.props.value + this.state.additions}
      </Text>
    );
  }
}
