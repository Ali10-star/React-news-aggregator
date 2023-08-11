const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
    };

    return date.toLocaleString('en-US', options);
};

function forceTextLength(text, desiredLength) {
    if (text.length > desiredLength) {
        return text.substring(0, desiredLength);
    } else if (text.length < desiredLength) {
        const paddingLength = (desiredLength - text.length) / 2;
        const leftPadding = ' '.repeat(Math.floor(paddingLength));
        const rightPadding = ' '.repeat(Math.ceil(paddingLength));
        return leftPadding + text + rightPadding;
    }
    return text;
}

export { formatDate, forceTextLength };