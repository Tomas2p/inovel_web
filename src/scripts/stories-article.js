// Agrega esto al principio de tu script
document.addEventListener("DOMContentLoaded", () => {
  fetch("../resources/stories/stories.json")
    .then((response) => response.json())
    .then((data) => {
      const stories = data.stories;
      const grid = document.querySelector(".grid-wrapper");

      stories.forEach((story) => {
        const card = createCard(story);
        grid.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error al cargar los datos de las historias:", error);
    });
});

function createCard(story) {
  const card = document.createElement("article");
  card.classList.add(story.size);
  card.addEventListener("click", () => {
    window.location.href = "./story.html";
  });

  const icon = document.createElement("i");
  icon.classList.add(story.status);
  icon.textContent = story.status;
  card.appendChild(icon);

  const img = document.createElement("img");
  img.src = story.image;
  img.alt = "Imagen de la historia";
  card.appendChild(img);

  const content = document.createElement("div");
  content.classList.add("content");

  const title = document.createElement("h2");
  title.textContent = story.title;
  content.appendChild(title);

  const description = document.createElement("p");
  description.textContent = story.description;
  content.appendChild(description);

  card.appendChild(content);

  return card;
}
