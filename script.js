<<<<<<< HEAD
/* =========================================================
   FRESHMANOS
   Interactive JavaScript
========================================================= */


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("freshmanos-theme");


if (savedTheme === "dark") {
    document.body.classList.add("dark");
}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "freshmanos-theme",
            isDark ? "dark" : "light"
        );

    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileNav =
    document.getElementById("mobileNav");


if (menuButton && mobileNav) {

    menuButton.addEventListener("click", () => {

        mobileNav.classList.toggle("active");

    });


    document
        .querySelectorAll(".mobile-nav a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");

            });

        });

}


/* =========================================================
   INTERACTIVE 3D HERO
========================================================= */

const scene =
    document.getElementById("scene");


if (scene) {

    scene.addEventListener("mousemove", (event) => {

        const rect =
            scene.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateY =
            ((x - centerX) / centerX) * 8;

        const rotateX =
            ((centerY - y) / centerY) * 8;

        scene.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

    });


    scene.addEventListener("mouseleave", () => {

        scene.style.transform =
            "rotateX(0deg) rotateY(0deg)";

    });

}


/* =========================================================
   FEATURE CARD 3D TILT
========================================================= */

const cards =
    document.querySelectorAll(".tilt-card");


cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;

            card.style.transform = `
                perspective(700px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-4px)
            `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = `
                perspective(700px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0)
            `;

        }
    );

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        }
    );

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".feature-card, .community, .final-cta"
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

});


if (revealElements.length > 0) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   FEATURE MODULE NAVIGATION
========================================================= */

/*
   IMPORTANT:
   Previously these buttons showed an alert saying
   the module needed a backend.

   Now they actually open the corresponding page.
*/

const modulePaths = {

    "Academic Hub":
        "academic/index.html",

    "Campus Guide":
        "campus/index.html",

    "Student Hub":
        "student/index.html",

    "Events":
        "events/index.html",

    "Lost & Found":
        "lost-found/index.html",

    "Help & Support":
        "help/index.html"

};


document
    .querySelectorAll(".card-arrow")
    .forEach(button => {

        button.addEventListener(
            "click",
            (event) => {

                /*
                   Stop the old popup behavior.
                */

                event.preventDefault();

                event.stopPropagation();


                const card =
                    button.closest(
                        ".feature-card"
                    );


                if (!card) {
                    return;
                }


                const titleElement =
                    card.querySelector("h3");


                if (!titleElement) {
                    return;
                }


                const title =
                    titleElement.textContent.trim();


                const destination =
                    modulePaths[title];


                if (destination) {

                    window.location.href =
                        destination;

                }

            }
        );

    });


/* =========================================================
   FEATURE CARD DIRECT NAVIGATION
========================================================= */

/*
   If a feature card itself is clickable,
   these links will work normally.

   This section is only a safety net for cards
   that aren't already <a href="..."> elements.
*/

document
    .querySelectorAll(".feature-card")
    .forEach(card => {

        /*
           If the card is already an anchor,
           don't interfere with its normal navigation.
        */

        if (card.tagName.toLowerCase() === "a") {
            return;
        }


        card.addEventListener("click", () => {

            const titleElement =
                card.querySelector("h3");


            if (!titleElement) {
                return;
            }


            const title =
                titleElement.textContent.trim();


            const destination =
                modulePaths[title];


            if (destination) {

                window.location.href =
                    destination;

            }

        });

    });


/* =========================================================
   PARALLAX FLOATING CARDS
========================================================= */

const floatingCards =
    document.querySelectorAll(
        ".float-card"
    );


if (scene) {

    scene.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                scene.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width
                - 0.5;

            const y =
                (event.clientY - rect.top)
                / rect.height
                - 0.5;


            floatingCards.forEach(
                (card, index) => {

                    const strength =
                        8 + index * 2;

                    card.style.marginLeft =
                        `${x * strength}px`;

                    card.style.marginTop =
                        `${y * strength}px`;

                }
            );

        }
    );


    scene.addEventListener(
        "mouseleave",
        () => {

            floatingCards.forEach(card => {

                card.style.marginLeft = "0px";
                card.style.marginTop = "0px";

            });

        }
    );

=======
/* =========================================================
   FRESHMANOS
   Interactive JavaScript
========================================================= */


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("freshmanos-theme");


if (savedTheme === "dark") {
    document.body.classList.add("dark");
}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "freshmanos-theme",
            isDark ? "dark" : "light"
        );

    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileNav =
    document.getElementById("mobileNav");


if (menuButton && mobileNav) {

    menuButton.addEventListener("click", () => {

        mobileNav.classList.toggle("active");

    });


    document
        .querySelectorAll(".mobile-nav a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");

            });

        });

}


/* =========================================================
   INTERACTIVE 3D HERO
========================================================= */

const scene =
    document.getElementById("scene");


if (scene) {

    scene.addEventListener("mousemove", (event) => {

        const rect =
            scene.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateY =
            ((x - centerX) / centerX) * 8;

        const rotateX =
            ((centerY - y) / centerY) * 8;

        scene.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

    });


    scene.addEventListener("mouseleave", () => {

        scene.style.transform =
            "rotateX(0deg) rotateY(0deg)";

    });

}


/* =========================================================
   FEATURE CARD 3D TILT
========================================================= */

const cards =
    document.querySelectorAll(".tilt-card");


cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;

            card.style.transform = `
                perspective(700px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-4px)
            `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = `
                perspective(700px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0)
            `;

        }
    );

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        }
    );

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".feature-card, .community, .final-cta"
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

});


if (revealElements.length > 0) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   FEATURE MODULE NAVIGATION
========================================================= */

/*
   IMPORTANT:
   Previously these buttons showed an alert saying
   the module needed a backend.

   Now they actually open the corresponding page.
*/

const modulePaths = {

    "Academic Hub":
        "academic/index.html",

    "Campus Guide":
        "campus/index.html",

    "Student Hub":
        "student/index.html",

    "Events":
        "events/index.html",

    "Lost & Found":
        "lost-found/index.html",

    "Help & Support":
        "help/index.html"

};


document
    .querySelectorAll(".card-arrow")
    .forEach(button => {

        button.addEventListener(
            "click",
            (event) => {

                /*
                   Stop the old popup behavior.
                */

                event.preventDefault();

                event.stopPropagation();


                const card =
                    button.closest(
                        ".feature-card"
                    );


                if (!card) {
                    return;
                }


                const titleElement =
                    card.querySelector("h3");


                if (!titleElement) {
                    return;
                }


                const title =
                    titleElement.textContent.trim();


                const destination =
                    modulePaths[title];


                if (destination) {

                    window.location.href =
                        destination;

                }

            }
        );

    });


/* =========================================================
   FEATURE CARD DIRECT NAVIGATION
========================================================= */

/*
   If a feature card itself is clickable,
   these links will work normally.

   This section is only a safety net for cards
   that aren't already <a href="..."> elements.
*/

document
    .querySelectorAll(".feature-card")
    .forEach(card => {

        /*
           If the card is already an anchor,
           don't interfere with its normal navigation.
        */

        if (card.tagName.toLowerCase() === "a") {
            return;
        }


        card.addEventListener("click", () => {

            const titleElement =
                card.querySelector("h3");


            if (!titleElement) {
                return;
            }


            const title =
                titleElement.textContent.trim();


            const destination =
                modulePaths[title];


            if (destination) {

                window.location.href =
                    destination;

            }

        });

    });


/* =========================================================
   PARALLAX FLOATING CARDS
========================================================= */

const floatingCards =
    document.querySelectorAll(
        ".float-card"
    );


if (scene) {

    scene.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                scene.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width
                - 0.5;

            const y =
                (event.clientY - rect.top)
                / rect.height
                - 0.5;


            floatingCards.forEach(
                (card, index) => {

                    const strength =
                        8 + index * 2;

                    card.style.marginLeft =
                        `${x * strength}px`;

                    card.style.marginTop =
                        `${y * strength}px`;

                }
            );

        }
    );


    scene.addEventListener(
        "mouseleave",
        () => {

            floatingCards.forEach(card => {

                card.style.marginLeft = "0px";
                card.style.marginTop = "0px";

            });

        }
    );

>>>>>>> 56f5145858debd42d87b399bd606563e5f77907b
}