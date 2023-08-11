import React from 'react';

class IgnoreErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Handle the error here, if needed
  }

  render() {
    return this.props.children;
  }
}

export default IgnoreErrorBoundary;