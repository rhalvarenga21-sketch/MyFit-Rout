type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';

interface LogEntry {
    id: string;
    timestamp: string;
    level: LogLevel;
    message: string;
    details?: any;
}

class DebugService {
    private logs: LogEntry[] = [];
    private listeners: ((logs: LogEntry[]) => void)[] = [];
    private MAX_LOGS = 50;

    constructor() {
        // Override console.error locally to capture system errors
        /*
        const originalError = console.error;
        console.error = (...args) => {
            this.log('ERROR', args[0], args.slice(1));
            originalError(...args);
        };
        */
    }

    log(level: LogLevel, message: string, details?: any) {
        const entry: LogEntry = {
            id: Math.random().toString(36).substring(2, 9),
            timestamp: new Date().toLocaleTimeString(),
            level,
            message,
            details: typeof details === 'object' ? JSON.stringify(details, null, 2) : details
        };

        this.logs = [entry, ...this.logs].slice(0, this.MAX_LOGS);
        this.notifyListeners();
    }

    getLogs() {
        return this.logs;
    }

    subscribe(listener: (logs: LogEntry[]) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notifyListeners() {
        this.listeners.forEach(l => l(this.logs));
    }

    clear() {
        this.logs = [];
        this.notifyListeners();
    }
}

export const logger = new DebugService();
