document.getElementById("uv-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var searchText = document.getElementById("uv-address").value;
    if (isValidURL(searchText)) {
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(searchText.startsWith("http") ? searchText : "https://" + searchText);
    } else {
        var searchEngine = document.getElementById("uv-search-engine").value;
        var searchUrl = searchEngine.replace("%s", encodeURIComponent(searchText));
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(searchUrl);
    }
});