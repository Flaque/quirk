import React from "react";
import Sentry from "sentry-expo";

Sentry.enableInExpoDevelopment = true;
Sentry.config(
  "https://a9115f37287d4db39106d77e73aefa03@sentry.io/1443374"
).install();

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, {
      extra: errorInfo,
    });
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default Component => {
  return class extends React.Component {
    render() {
      return (
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>
      );
    }
  };
};
