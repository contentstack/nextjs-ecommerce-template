function removeChars(url) {
    return url.substr(0, url.length - 1);
}

function toogleButtonState() {
    if (simpleCart.items().length === 0) {
        $(".simpleCart_empty").attr("disabled", true);
        $(".simpleCart_checkout_button").attr("disabled", true);
    } else {
        $(".simpleCart_empty").attr("disabled", true);
        $(".simpleCart_checkout_button").removeAttr("disabled");
    }
}

$('#selectpicker').on('change', function (e){
    let url = new URL(window.location.href)
    let newUrl;
    if (e.target.value === 'en-us') {
        newUrl = url.origin+ url.pathname;
    }
    else{
        newUrl = url.origin+url.pathname+`?locale=${e.target.value}`
    }
    window.location.assign(newUrl)
    // history.replaceState(null, null, newUrl);
    // location.reload();
})

// $('.selectpicker').on('change', function () {
//     let url = "";
//     let urlArray = window.location.href.split("/");

//     if (this.value.split("-", 1) == 'en') {
//         urlArray.remove("fr");
//         urlArray.remove("es");
//         urlArray.remove("en");
//     } else if (this.value.split("-", 1) == 'fr') {
//         urlArray.remove("en");
//         urlArray.remove("es");
//         urlArray.insert(3, 'fr');
//     } else if (this.value.split("-", 1) == 'es') {
//         urlArray.remove("fr");
//         urlArray.remove("en");
//         urlArray.insert(3, 'es');
//     }

//     urlArray.forEach((part) => {
//         url += `${part}/`
//     })

//     url = removeChars(url);
//     history.replaceState(null, null, url);
//     location.reload();
// });

simpleCart.bind('ready', function () {;
    toogleButtonState();

    $("#cart").on("click", function () {
        $(".shopping-cart").fadeToggle("fast");
    });

    simpleCart.bind("afterAdd", function (item, isNew) {
        $('html, body').animate({ scrollTop: 0 }, 'medium');
        $(".shopping-cart").fadeIn("medium");
    });

    simpleCart.bind('update', toogleButtonState);
});

simpleCart({
    cartStyle: "div",
    cartColumns: [
        { view: "image", attr: "thumb", label: false },
        { attr: "name", label: "Name" },
        { attr: "price", label: "Price", view: "currency" },
        { view: "decrement", label: false, text: " - " },
        { attr: "quantity", label: "Qty" },
        { view: "increment", label: false, text: " + " },
        { view: "remove", text: "Remove", label: false }
    ]
});