import theme from "../../theme";
import React from "react";
import { Label } from "../../ui";
import * as d3 from "d3-interpolate";

export default class AnimatedCounter extends React.Component<
  {
    value: number;
    keyFrames: number;
    time: number;
  },
  {
    value: number;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  _scheduleKeyFrame(interpolator: (i: number) => number, decimalIndex: number) {
    setTimeout(() => {
      this.setState({
        value: Math.floor(interpolator(decimalIndex)),
      });
    }, decimalIndex * this.props.time);
  }

  _animateValue = (oldValue: number) => {
    const interpolator = d3.interpolate(oldValue, this.props.value);

    for (let i = 0; i < this.props.keyFrames; i++) {
      this._scheduleKeyFrame(interpolator, (i + 1) / this.props.keyFrames);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value === this.props.value) {
      return;
    }

    this._animateValue(prevProps.value);
  }

  render() {
    return (
      <Label
        style={{
          color: theme.lightText,
        }}
      >
        {this.state.value}
      </Label>
    );
  }
}
