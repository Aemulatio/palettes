document.querySelectorAll(".card").forEach((card) =>
  card.addEventListener("mouseout", function () {
    this.classList.toggle("active");
  })
);
