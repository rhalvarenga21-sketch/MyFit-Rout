// Test setup file
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { },
        removeListener: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => { },
    }),
});

// Mock navigator.clipboard
Object.assign(navigator, {
    clipboard: {
        writeText: () => Promise.resolve(),
    },
});

// Mock Web Share API
Object.assign(navigator, {
    share: () => Promise.resolve(),
    canShare: () => true,
});
