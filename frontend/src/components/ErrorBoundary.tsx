import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Widget Error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full min-h-62.5 flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <AlertTriangle className="mb-4 text-red-500" size={40} />

          <h3 className="mb-2 text-lg font-semibold">
            {this.props.fallbackTitle ?? "Widget Error"}
          </h3>

          <p className="mb-4 text-sm text-gray-600">
            Something went wrong while rendering this widget.
          </p>

          {this.state.error && (
            <pre className="mb-4 max-w-full overflow-auto rounded bg-white p-2 text-xs text-red-600">
              {this.state.error.message}
            </pre>
          )}

          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
