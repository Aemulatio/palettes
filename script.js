const directions = { 0: "top", 1: "right", 2: "bottom", 3: "left" };
const getDirectionKey = (ev, node) => {
  const { width, height, top, left } = node.getBoundingClientRect();
  const l = ev.pageX - (left + window.pageXOffset);
  const t = ev.pageY - (top + window.pageYOffset);
  const x = l - (width / 2) * (width > height ? height / width : 1);
  const y = t - (height / 2) * (height > width ? width / height : 1);
  return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
};

document.querySelectorAll(".card").forEach((card) => {
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
      this.classList.toggle("active");
    }

    if (
      (inSide === "top" && outSide === "bottom") ||
      (outSide === "top" && inSide === "bottom")
    ) {
      this.classList.toggle("active");
    }
  });
});
