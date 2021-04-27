import React from 'react';
import ErrorIndicator from '../Error-indicator/Error-indicator';

type MyProps = {};
type MyState = { hasError: boolean };

export default class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: boolean) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return this.props.children;
  }
}
