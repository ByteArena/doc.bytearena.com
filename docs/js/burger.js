(function burger(burgerselector) {
    var burger = document.querySelector(burgerselector);
    if (!burger) return;

    var html = document.documentElement;

    burger.addEventListener("click", function() {
        var isVisible = html.classList.contains("menu-visible");
        if (isVisible) {
            html.classList.remove("menu-visible");
            html.classList.add("menu-hidden");
        } else {
            html.classList.remove("menu-hidden");
            html.classList.add("menu-visible");
        }
    });

})("#burger");
