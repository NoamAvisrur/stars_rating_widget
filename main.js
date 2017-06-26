var stars = document.querySelectorAll('.review_star');
for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener('mouseenter', function(e) {
        var dex = Array.prototype.indexOf.call(stars, e.target);
        for (var idx = 0; idx < dex + 1; idx++) {
            stars[idx].innerHTML = "&#9733;";
        }
    })
}

for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener('mouseleave', function(e) {
        for (let i = 0; i < stars.length; i++) {
            if (stars[i].className !== "review_star selected") {
                stars[i].innerHTML = "&#9734;";
            }
        }
    })
}

for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener('click', function(e) {
        cleanStras(stars);
        var index = Array.prototype.indexOf.call(stars, e.target);
        for (var idx = 0; idx < index + 1; idx++) {
            stars[idx].innerHTML = "&#9733;";
            stars[idx].classList.add("selected");
        }
    })
}


function cleanStras(stars) {
    for (let i = 0; i < stars.length; i++) {
        stars[i].innerHTML = "&#9734;";
        stars[i].classList.remove("selected");
    }
}