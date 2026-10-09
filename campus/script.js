/* =====================================================
   FRESHMANOS — CAMPUS GUIDE
===================================================== */


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

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


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileNav =
    document.getElementById("mobileNav");


if (menuButton && mobileNav) {

    menuButton.addEventListener("click", () => {

        mobileNav.classList.toggle("active");

    });


    mobileNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");

            });

        });

}


/* =====================================================
   CAMPUS MAP 3D INTERACTION
===================================================== */

const mapScene =
    document.getElementById("mapScene");


if (mapScene) {

    mapScene.addEventListener(
        "mousemove",
        event => {

            const rect =
                mapScene.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                ((x - centerX) / centerX) * 7;

            const rotateX =
                ((centerY - y) / centerY) * 6;


            mapScene.style.transform = `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;

        }
    );


    mapScene.addEventListener(
        "mouseleave",
        () => {

            mapScene.style.transform =
                "rotateX(0deg) rotateY(0deg)";

        }
    );

}


/* =====================================================
   SEARCH
===================================================== */

const searchInput =
    document.getElementById("searchInput");

const placeCards =
    document.querySelectorAll(".place-card");

const noResults =
    document.getElementById("noResults");


function searchPlaces(query) {

    const cleanQuery =
        query.toLowerCase().trim();

    let visibleCount = 0;


    placeCards.forEach(card => {

        const searchText = (

            (card.dataset.search || "") +
            " " +
            card.innerText

        ).toLowerCase();


        const matches =
            searchText.includes(cleanQuery);


        card.style.display =
            matches ? "" : "none";


        if (matches) {
            visibleCount++;
        }

    });


    if (noResults) {

        noResults.style.display =
            visibleCount === 0
                ? "block"
                : "none";

    }

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            searchPlaces(
                searchInput.value
            );

        }
    );

}


/* =====================================================
   KEYBOARD SEARCH
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "/" &&
            document.activeElement !== searchInput &&
            searchInput
        ) {

            event.preventDefault();

            searchInput.focus();

        }


        if (
            event.key === "Escape" &&
            document.activeElement === searchInput
        ) {

            searchInput.value = "";

            searchPlaces("");

            searchInput.blur();

        }

    }
);


/* =====================================================
   QUICK SEARCH TAGS
===================================================== */

const quickTags =
    document.querySelectorAll(
        ".quick-tags button"
    );


quickTags.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const query =
                button.dataset.search || "";


            if (searchInput) {

                searchInput.value = query;

                searchPlaces(query);

                document
                    .querySelector(".places-section")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }

        }
    );

});


/* =====================================================
   CATEGORY FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                btn => {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add("active");


            const category =
                button.dataset.category;


            let visibleCount = 0;


            placeCards.forEach(card => {

                const matches =
                    category === "all" ||
                    card.dataset.category === category;


                card.style.display =
                    matches ? "" : "none";


                if (matches) {

                    visibleCount++;

                }

            });


            if (noResults) {

                noResults.style.display =
                    visibleCount === 0
                        ? "block"
                        : "none";

            }


            /* Clear search when using filters */

            if (searchInput) {

                searchInput.value = "";

            }

        }
    );

});


/* =====================================================
   PLACE CARD TILT
===================================================== */

placeCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

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
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;


            card.style.transform = `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-6px)
            `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".stat-card, .place-card, .campus-tip, .campus-cta"
    );


revealElements.forEach(
    element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(22px)";

        element.style.transition =
            "opacity .65s ease, transform .65s ease";

    }
);


if (revealElements.length > 0) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            observer.observe(element);

        }
    );

}