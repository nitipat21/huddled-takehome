export const formatDuration = (milliseconds: number): string => {
	if (milliseconds <= 0) return '0s';

	const seconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	if (seconds < 60) return `${seconds}s`;
	if (minutes < 60) return `${minutes}m`;
	return `${hours}h`;
};
