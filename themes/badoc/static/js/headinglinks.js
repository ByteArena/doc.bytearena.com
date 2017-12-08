(function addHeadingLinks() {
    var article = document.body;
    var headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(function (heading) {
        if (!heading.id) return;
        var a = document.createElement('a');
        a.innerHTML = '<img src="/img/link.svg" width="16" height="16" />';
        a.className = "header-anchor-link";
        a.href = '#' + heading.id;
        heading.appendChild(a);
    });
})();