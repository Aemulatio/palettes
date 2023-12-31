const directions = {0: "top", 1: "right", 2: "bottom", 3: "left"};
const getDirectionKey = (ev, node) => {
    const {width, height, top, left} = node.getBoundingClientRect();
    const l = ev.pageX - (left + window.pageXOffset);
    const t = ev.pageY - (top + window.pageYOffset);
    const x = l - (width / 2) * (width > height ? height / width : 1);
    const y = t - (height / 2) * (height > width ? width / height : 1);
    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
};
const acceptConfig = (e) => {
    e.preventDefault();
    const size = document.querySelector("#size").value,
        amount = Number(document.querySelector("#amount").value),
        container = document.querySelector("#grid");

    container.replaceChildren();
    new Array(amount).fill(1).forEach((_) => {
        const card = document.createElement("div");
        card.classList.add("card");
        container.appendChild(card);
    });

    const gridSize = Math.ceil(Math.sqrt(amount));
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;


    document.querySelectorAll(".card").forEach((card) => {
        card.style.width = `${size}px`;
        card.style.height = `${size}px`;

        let inSide, outSide;

        card.addEventListener("mouseover", function (e) {
            inSide = directions[getDirectionKey(e, this)];
        });
        card.addEventListener("mouseout", function (e) {
            outSide = directions[getDirectionKey(e, this)];

            if (
                (inSide === "left" && outSide === "right") ||
                (outSide === "left" && inSide === "right")
            ) {
                if (this.classList.contains("active-y"))
                    this.classList.remove("active-y");
                else this.classList.toggle("active-x");
            }

            if (
                (inSide === "top" && outSide === "bottom") ||
                (outSide === "top" && inSide === "bottom")
            ) {
                if (this.classList.contains("active-x"))
                    this.classList.remove("active-x");
                else this.classList.toggle("active-y");
            }
        });
    });
};

document
    .querySelector(".side-panel__form")
    .addEventListener("onsubmit", acceptConfig);
document
    .querySelector(".side-panel__submit")
    .addEventListener("click", acceptConfig);

/////////

document.querySelector("#configVisibility").addEventListener("click", function () {
    document.querySelector(".side-panel").classList.toggle("hidden")
    if (this.getAttribute("aria-expanded") === "false")
        this.setAttribute("aria-expanded", "true");
    else
        this.setAttribute("aria-expanded", "false");
})

//popper

const infoRef = document.querySelector("#info"),
    infoContent = document.querySelector(".side-panel__info")

const popperInstance = Popper.createPopper(infoRef, infoContent, {
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 5],
            },
        },
    ],
});

function show() {
    infoContent.setAttribute('data-show', '');

    popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: true },
        ],
    }));

    popperInstance.update();
}

function hide() {
    infoContent.removeAttribute('data-show');

    popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: false },
        ],
    }));
}

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

showEvents.forEach((event) => {
    infoRef.addEventListener(event, show);
});

hideEvents.forEach((event) => {
    infoRef.addEventListener(event, hide);
});
