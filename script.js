document.getElementById("searchButton").addEventListener("click", function () {
    const searchTerm = document.getElementById("searchInput").value;
    if (searchTerm) {
        fetchAndDisplayResults(searchTerm);
    }
});

function fetchAndDisplayResults(searchTerm) {
    const apiUrl = `https://www.WEBSITE.hr/hr/rezultati-pretrage?s=1&keyword=${searchTerm}`;

    fetch(apiUrl)
        .then((response) => response.text()) // Fetch the HTML content, not JSON
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract the data from the HTML document (e.g., using document.querySelector)
            const results = extractDataFromHTML(doc);

            displayResults(results);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

function extractDataFromHTML(doc) {
    // Implement logic to extract data from the HTML document here.
    // Use DOM manipulation techniques like doc.querySelector, doc.querySelectorAll, etc.
    // and create an array of result objects.
    // For example:
    const results = [];
    doc.querySelectorAll('.initialized').forEach((resultItem) => {
        results.push({
            title: resultItem.querySelector('.search-autocomplete').textContent,
            snippet: resultItem.querySelector('.keyword').textContent,
        });
    });
    return results;
}

function displayResults(results) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (results.length === 0) {
        resultsDiv.innerHTML = "No results found.";
    } else {
        const ul = document.createElement("ul");

        results.forEach((result) => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="https://www.WEBSITE.hr/hr/rezultati-pretrage?s=1&keyword=${result.title}" target="_blank">${result.title}</a>: ${result.snippet}`;
            ul.appendChild(li);
        });

        resultsDiv.appendChild(ul);
    }
}