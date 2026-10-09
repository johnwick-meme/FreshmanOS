/* =========================================================
   FRESHMANOS — ACADEMIC HUB
========================================================= */


/* =========================================================
   THEME
========================================================= */

// Add this to academic/script.js or in a <script> tag in academic/index.html

const API = "https://freshmanos.onrender.com"; // Change to your Render URL later

// Fetch subjects for a branch
async function loadAcademics(branch) {
    try {
        const response = await fetch(`${API}/api/academic/${branch}`);
        const data = await response.json();
        
        // Display the data
        displaySubjects(data.subjects);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('results').innerHTML = 
            '<p>Error loading data. Make sure backend is running.</p>';
    }
}

// Display subjects in the UI
function displaySubjects(subjects) {
    const container = document.getElementById('results');
    
    if (!subjects || subjects.length === 0) {
        container.innerHTML = '<p>No subjects found.</p>';
        return;
    }
    
    container.innerHTML = subjects.map(subject => `
        <div class="subject-card">
            <h3>${subject.name || subject.title || 'Subject'}</h3>
            <p>${subject.description || subject.desc || ''}</p>
            <div class="subject-details">
                <span>Credits: ${subject.credits || 'N/A'}</span>
                <span>Code: ${subject.code || 'N/A'}</span>
            </div>
        </div>
    `).join('');
}

// Add event listener for branch selection
document.addEventListener('DOMContentLoaded', function() {
    const branchSelect = document.getElementById('branchSelect');
    const loadButton = document.getElementById('loadButton');
    
    if (loadButton) {
        loadButton.addEventListener('click', function() {
            const selectedBranch = branchSelect.value;
            if (selectedBranch) {
                loadAcademics(selectedBranch);
            }
        });
    }
});


const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("freshmanos-theme");


if (savedTheme === "dark") {
    document.body.classList.add("dark");
}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "freshmanos-theme",
        dark ? "dark" : "light"
    );

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const mobileNav =
    document.getElementById("mobileNav");


menuBtn.addEventListener("click", () => {

    mobileNav.classList.toggle("active");

});


mobileNav
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");

        });

    });


/* =========================================================
   SEARCH
========================================================= */

const searchInput =
    document.getElementById("searchInput");

const subjectCards =
    document.querySelectorAll(".subject-card");

const noResults =
    document.getElementById("noResults");


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();

        let visibleCards = 0;


        subjectCards.forEach(card => {

            const searchableText =
                (
                    card.dataset.search +
                    " " +
                    card.innerText
                ).toLowerCase();


            if (
                searchableText.includes(query)
            ) {

                card.style.display = "flex";

                visibleCards++;

            } else {

                card.style.display = "none";

            }

        });


        if (visibleCards === 0) {

            noResults.style.display =
                "block";

        } else {

            noResults.style.display =
                "none";

        }

    }
);


/* =========================================================
   KEYBOARD SEARCH
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "/" &&
            document.activeElement !== searchInput
        ) {

            event.preventDefault();

            searchInput.focus();

        }

        if (
            event.key === "Escape" &&
            document.activeElement === searchInput
        ) {

            searchInput.value = "";

            searchInput.dispatchEvent(
                new Event("input")
            );

            searchInput.blur();

        }

    }
);


/* =========================================================
   SEMESTER SWITCHER
========================================================= */

const semesterSelect =
    document.getElementById(
        "semesterSelect"
    );


semesterSelect.addEventListener(
    "change",
    () => {

        const semester =
            semesterSelect.value;


        if (semester === "2") {

            subjectCards.forEach(card => {

                card.style.opacity = "0.45";

            });

            setTimeout(() => {

                alert(
                    "Semester 2 resources will appear here once students start uploading them. 🚀"
                );

            }, 100);

        } else {

            subjectCards.forEach(card => {

                card.style.opacity = "1";

            });

        }

    }
);


/* =========================================================
   SUBJECT MODAL
========================================================= */

const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );


const subjectButtons =
    document.querySelectorAll(
        ".open-subject"
    );


subjectButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const card =
                button.closest(
                    ".subject-card"
                );

            const title =
                card.querySelector(
                    "h3"
                ).textContent;

            const code =
                card.querySelector(
                    ".subject-code"
                ).textContent;


            modalTitle.textContent =
                title;

            modalDescription.textContent =
                `${code} — Choose a resource to explore.`;


            modalOverlay.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        }
    );

});


function closeModalWindow() {

    modalOverlay.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


closeModal.addEventListener(
    "click",
    closeModalWindow
);


modalOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modalOverlay
        ) {

            closeModalWindow();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modalOverlay.classList.contains(
                "active"
            )
        ) {

            closeModalWindow();

        }

    }
);


/* =========================================================
   RESOURCE BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".resource-card button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const title =
                    button
                        .closest(
                            ".resource-card"
                        )
                        .querySelector(
                            "h3"
                        )
                        .textContent;


                alert(
                    `${title}\n\nThis resource section will be connected to the FreshmanOS resource database.`
                );

            }
        );

    });


/* =========================================================
   DOWNLOAD BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".download-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const item =
                    button.closest(
                        ".recent-item"
                    );

                const title =
                    item.querySelector(
                        "h3"
                    ).textContent;


                alert(
                    `Downloading:\n${title}\n\nFile storage will be connected later.`
                );

            }
        );

    });


/* =========================================================
   MODAL RESOURCE BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".modal-options button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                alert(
                    `${button.textContent.trim()}\n\nThis resource type is ready to be connected to the backend.`
                );

            }
        );

    });


/* =========================================================
   3D NOTEBOOK MOUSE INTERACTION
========================================================= */

const academicVisual =
    document.querySelector(
        ".academic-visual"
    );

const notebook =
    document.querySelector(
        ".notebook"
    );


academicVisual.addEventListener(
    "mousemove",
    event => {

        const rect =
            academicVisual.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left;

        const y =
            event.clientY -
            rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateY =
            ((x - centerX) /
                centerX) * 12;

        const rotateX =
            ((centerY - y) /
                centerY) * 8;


        notebook.style.transform = `
            rotateY(${-17 + rotateY}deg)
            rotateX(${7 + rotateX}deg)
            rotateZ(-4deg)
            translateY(-5px)
        `;

    }
);


academicVisual.addEventListener(
    "mouseleave",
    () => {

        notebook.style.transform = `
            rotateY(-17deg)
            rotateX(7deg)
            rotateZ(-4deg)
        `;

    }
);
