(function iframeAsync() {

    var items = document.body.querySelectorAll(".youtube-video div[src]");

    items.forEach(function(item) {
        var src = item.getAttribute('src');
        item.innerHTML = '<iframe src="' + src + '" allowfullscreen frameborder="0"></iframe>';
    });
})();
