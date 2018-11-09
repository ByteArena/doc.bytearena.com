(function addHeadingLinks() {
    function trimUrl(url) {
        return url.replace(/^\/+/, "").replace(/\/+$/, "");
    }

    var items = document.body.querySelectorAll("ul.menu li");

    var curUrl = trimUrl(window.location.pathname);

    items.forEach(function(item) {
        var a = item.querySelector("a");
        if (!a) return;

        var pathname = a.pathname;
        if (!pathname) return;

        if (trimUrl(pathname) !== curUrl) return;

        item.className += " active";
    });
})();
