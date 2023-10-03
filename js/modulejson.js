//Fetch json data from any url
function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}

export {fetchAnyUrl}