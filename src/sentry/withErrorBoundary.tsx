import React from "react";
import Sentry from "./index";

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Don't send errors to sentry in development
    if (__DEV__) {
      console.error(error, errorInfo);
      return;
    }

    if (errorInfo) {
      console.error(error, errorInfo);
      Sentry.captureException(error, {
        extra: errorInfo,
      });
    }

    Sentry.captureException(error);
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
