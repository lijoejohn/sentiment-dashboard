// src/components/ErrorBoundary.jsx
import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // You can also log error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-red-800 bg-red-100 rounded">
          <h2 className="text-lg font-semibold">Something went wrong.</h2>
          <pre className="mt-2 text-sm">{this.state.error?.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
