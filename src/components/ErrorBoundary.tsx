/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Prevents the entire app from crashing when a component fails
 */

import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console (in production, send to error tracking service)
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Log to error tracking service (e.g., Sentry, LogRocket)
    // logErrorToService(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = (): void => {
    window.location.href = "/";
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-700 rounded-lg shadow-xl p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-red-500/20 p-4 rounded-full">
                <AlertTriangle className="h-12 w-12 text-red-500" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">
              Oups ! Une erreur est survenue
            </h1>

            <p className="text-slate-300 mb-6">
              Désolé, quelque chose s'est mal passé. L'équipe a été notifiée et
              nous travaillons à résoudre le problème.
            </p>

            {/* Show error details in development */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-slate-400 hover:text-slate-300 mb-2">
                  Détails de l'erreur (dev only)
                </summary>
                <div className="bg-slate-800 p-4 rounded text-xs text-red-400 overflow-auto max-h-48">
                  <p className="font-bold mb-2">{this.state.error.toString()}</p>
                  {this.state.errorInfo && (
                    <pre className="whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className="flex gap-3">
              <Button
                onClick={this.handleReset}
                variant="outline"
                className="flex-1"
              >
                Réessayer
              </Button>
              <Button onClick={this.handleReload} className="flex-1">
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
