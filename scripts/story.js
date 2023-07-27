/* const yaml = requiere('js-yaml');
import fs from 'fs'; */

class Story {
  constructor(data) {
    this.title = data.title;
    this.scenes = data.scenes;
    this.currentSceneIndex = 0;
  }

  run() {
    this.displayScene();
  }

  displayScene() {
    const scene = this.scenes[this.currentSceneIndex];
    const container = document.getElementById("story-container");

    // Limpiar el contenedor
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Mostrar el título de la historia
    const titleElement = document.createElement("h1");
    titleElement.textContent = this.title;
    container.appendChild(titleElement);

    // Mostrar el contenido de la escena
    const sceneElement = document.createElement("div");
    sceneElement.className = "scene";
    sceneElement.innerHTML = scene.content;
    container.appendChild(sceneElement);

    // Mostrar las opciones de la escena
    if (scene.options.length > 0) {
      const optionsElement = document.createElement("div");
      optionsElement.className = "options";
      scene.options.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option.text;
        optionButton.addEventListener("click", () => {
          this.currentSceneIndex = option.nextScene;
          this.displayScene();
        });
        optionsElement.appendChild(optionButton);
      });
      container.appendChild(optionsElement);
    }
  }
}

// Obtener la lista de historias disponibles en la carpeta "stories" en json
fetch("stories/json/stories.json")
  .then(response => response.json())
  .then(data => {
    const storyList = data.stories;
    showStoryOptions(storyList);
  })
  .catch((error) => {
    console.error("Error al cargar la lista de historias (json):", error);
  });

// Lo mismo en yaml
/* fetch("stories/yaml/stories.yaml")
  .then(response => response.text())
  .then(yamlData => {
    const jsonData = yaml.load(yamlData);
    const storyList = jsonData.stories;
    showStoryOptions(storyList);
  })
  .catch((error) => {
    console.error("Error al cargar la lista de historias (yaml):", error);
  }); */

// Mostrar las opciones de historias al usuario
function showStoryOptions(storyList) {
  const storyContainer = document.getElementById("story-container");

  // Crear el elemento de lista para las historias
  const storyListElement = document.createElement("ul");

  // Iterar sobre las historias y agregar opciones a la lista
  storyList.forEach((story, index) => {
    const listItem = document.createElement("button");
    listItem.textContent = `${story.title}`;
    listItem.className = "btn2";
    listItem.addEventListener("onclick", () => {
      loadStory(story.filename);
    });
    /* Por Implementar
    // Create the snap for the ribbon
    if (story.label != null) {
      const snap = document.createElement("snap");
      snap.textContent = story.label;
      snap.classList.add("ribbon","material-symbols-outlined");
      listItem.appendChild(snap);
    }
    */
    storyListElement.appendChild(listItem);
  });

  // Agregar la lista de historias al contenedor
  storyContainer.appendChild(storyListElement);
}

// Cargar la historia seleccionada
function loadStory(filename) {
  fetch(`stories/json/${filename}.json`)
    .then(response => response.json())
    .then(data => {
      const story = new Story(data);
      story.run();
    })
    .catch((error) => {
      console.error("Error al cargar la historia (json):", error);
    });
}

// Lo mismo en yaml
/* function loadStory(filename) {
  fetch(`stories/yaml/${filename}.yaml`)
    .then(response => response.text())
    .then(yamlData => {
      const jsonData = load(yamlData);
      const story = new Story(jsonData);
      story.run();
    })
    .catch((error) => {
      console.error("Error al cargar la historia (yaml):", error);
    });
} */