"use strict";

void (function () {
  const {body} = document;
  if (!body.hasAttribute("id")) body.setAttribute("id", "body");

  const ul = document.querySelector("ul");
  const addToFavorite = "Add favorite";
  const deleteFavorite = "Delete Favorite";

  const colorChangeBtn = document.querySelector("#colorScheme");
  const toDark = "Dark Theme";
  const toLight = "Light Theme";

  const onLoad = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const storageItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
      const item = document.querySelector(`#${storageItem.id}`);
      if (item.nodeName === "LI") {
        const button = document.querySelector(`#${item.id} button`);
        item.classList.add(storageItem.className);
        button.textContent = deleteFavorite;
      }
      if (item.nodeName === "BODY") {
        item.classList.add(storageItem.className);
        colorChangeBtn.textContent = "Light Theme";
      }
    }
  };

  document.addEventListener("DOMContentLoaded", onLoad);

  ul.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { target } = event;
    if (target.nodeName === "BUTTON") {
      const li = target.closest("li");
      const active = "active";
      li.classList.toggle(active);
      target.textContent = target.textContent.includes(addToFavorite)
        ? deleteFavorite
        : addToFavorite;
      if (li.classList.contains(active)) {
        const item = {
          id: li.id,
          className: active,
        };
        localStorage.setItem(li.id, JSON.stringify(item));
      } else {
        localStorage.removeItem(li.id);
      }
    }
  });

  colorChangeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { target } = event;
    const darkThemeClass = "darkTheme";
    body.classList.toggle(darkThemeClass);
    if (body.classList.contains(darkThemeClass)) {
      target.textContent = toLight;
      const item = {
        id: body.id,
        className: darkThemeClass,
      };
      localStorage.setItem(body.id, JSON.stringify(item));
    } else {
      target.textContent = toDark;
      localStorage.removeItem(body.id);
    }
  });
})();
