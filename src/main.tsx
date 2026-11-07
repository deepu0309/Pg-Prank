import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0614] text-amber-200 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-[#140e24] border border-amber-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="text-4xl">🪔</div>
            <h2 className="text-xl font-bold text-white">Sadashiv PG Portal Alert</h2>
            <p className="text-xs text-amber-200/80">
              Sunny Bhaiya’s server took a quick chai break. Please reload the page to continue claiming your reimbursement.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer"
            >
              Reload Portal
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
