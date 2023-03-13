const formatDate = (date) => {
    if(date && date.indexOf('T') > -1)
        date = date.split('T')[0];
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
};

function splitAndCapitalize(data) {
    return data.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export {
    formatDate,
    splitAndCapitalize
} 