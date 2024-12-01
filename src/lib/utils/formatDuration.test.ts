import { describe, expect, it } from 'vitest';
import { formatDuration } from './formatDuration';

describe('formatDuration', () => {
	it('should format durations less than 1 minute as seconds', () => {
		expect(formatDuration(500)).toBe('0s');
		expect(formatDuration(1000)).toBe('1s');
		expect(formatDuration(59000)).toBe('59s');
	});

	it('should format durations less than 1 hour as minutes', () => {
		expect(formatDuration(60000)).toBe('1m');
		expect(formatDuration(3599000)).toBe('59m');
	});

	it('should format durations of 1 hour or more as hours', () => {
		expect(formatDuration(3600000)).toBe('1h');
		expect(formatDuration(86400000)).toBe('24h');
	});

	it('should handle zero duration correctly', () => {
		expect(formatDuration(0)).toBe('0s');
	});

	it('should handle negative durations as 0s', () => {
		expect(formatDuration(-1000)).toBe('0s');
		expect(formatDuration(-60000)).toBe('0s');
	});
});
