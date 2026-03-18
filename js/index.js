const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = document.querySelector("#til-date").value;
  const title = document.querySelector("#til-title").value;
  const content = document.querySelector("#til-content").value;

  if (!date || !title || !content) {
    return;
  }

  const article = document.createElement("article");
  article.classList.add("til-item");

  const timeEl = document.createElement("time");
  timeEl.setAttribute("datetime", date);
  timeEl.textContent = date;

  const h3 = document.createElement("h3");
  h3.textContent = title;

  const p = document.createElement("p");
  p.textContent = content;

  article.appendChild(timeEl);
  article.appendChild(h3);
  article.appendChild(p);

  tilList.prepend(article);

  tilForm.reset();
});

// 갤러리 이미지 모달
const modal = document.querySelector("#image-modal");
const modalImage = document.querySelector("#modal-image");
const modalClose = document.querySelector(".modal-close");

document.querySelector(".gallery-grid").addEventListener("click", function (event) {
  if (event.target.tagName !== "IMG") return;
  modalImage.src = event.target.src;
  modalImage.alt = event.target.alt;
  modal.classList.add("active");
});

modalClose.addEventListener("click", function () {
  modal.classList.remove("active");
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});
