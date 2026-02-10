import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: '#ff5555', height: '100vh', fontFamily: 'monospace', overflow: 'auto' }}>
                    <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>⚠️ CRITICAL APP CRASH</h1>
                    <p>Please screenshot this screen and send it to support.</p>
                    <hr style={{ borderColor: '#333', margin: '20px 0' }} />
                    <h2 style={{ fontSize: '18px', color: '#fff' }}>{this.state.error?.toString()}</h2>
                    <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px', color: '#888' }}>
                        {this.state.errorInfo?.componentStack}
                    </details>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}
                        style={{
                            marginTop: '30px',
                            padding: '10px 20px',
                            backgroundColor: '#ff5555',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        RESET APP (CLEAR DATA)
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
