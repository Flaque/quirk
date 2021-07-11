import React from "react";
import { FadesIn } from "./animations";

interface SinglePageFormProps {
  steps: any[];
  index: number;
}

export default class SinglePageForm extends React.Component<
  SinglePageFormProps,
  {
    pose: "visible" | "hidden";
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      pose: "visible",
    };
  }

  componentDidUpdate(prevProps: SinglePageFormProps) {
    if (this.props.index !== prevProps.index) {
      this.setState({
        pose: "hidden",
      });

      setTimeout(() => {
        this.setState({
          pose: "visible",
        });
      }, 50);
    }
  }

  render() {
    return (
      <FadesIn pose={this.state.pose}>
        {this.props.steps[this.props.index]}
      </FadesIn>
    );
  }
}
