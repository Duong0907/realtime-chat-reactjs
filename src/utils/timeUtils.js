function calculateTimeFromNow(targetDateStr) {
    // Current date
    const now = new Date();
    const targetDate = new Date(targetDateStr);

    // Check if the input date is valid
    if (isNaN(targetDate.getTime())) {
        return 'Invalid date input';
    }

    // Calculate the difference in milliseconds
    const diffMs = now - targetDate; // Positive if target is in past, negative if in future
    const isPast = diffMs > 0;
    const absDiffMs = Math.abs(diffMs);

    // Convert milliseconds to various time units
    const diffSeconds = Math.floor(absDiffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const suffix = isPast ? 'ago' : 'from now';

    // Return the largest applicable unit
    if (diffWeeks > 0) {
        return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ${suffix}`;
    } else if (diffDays > 0) {
        return `${diffDays} day${diffDays === 1 ? '' : 's'} ${suffix}`;
    } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours === 1 ? '' : 's'} ${suffix}`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ${suffix}`;
    } else {
        return `${diffSeconds} second${diffSeconds === 1 ? '' : 's'} ${suffix}`;
    }
}

export { calculateTimeFromNow };
