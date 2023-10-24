document.getElementById("searchButton").addEventListener("click", function () {
    const searchTerm = document.getElementById("searchInput").value;
    if (searchTerm) {
        fetchAndDisplayResults(searchTerm);
    }
});

function fetchAndDisplayResults(searchTerm) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${searchTerm}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const results = data.query.search;
            displayResults(results);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
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
            li.innerHTML = `<a href="https://en.wikipedia.org/wiki/${result.title}" target="_blank">${result.title}</a>: ${result.snippet}`;
            ul.appendChild(li);
        });

        resultsDiv.appendChild(ul);
    }
}