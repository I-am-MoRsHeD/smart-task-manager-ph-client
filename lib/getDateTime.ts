export function getDateTime(dateString: string) {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        month: "short",
        day: "numeric",
        year: "numeric",
    };

    return date.toLocaleString("en-US", options);
}
