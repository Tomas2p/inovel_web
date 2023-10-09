class Story {
  constructor(data) {
    this.title = data.title;
    this.scenes = data.scenes;
    this.currentSceneIndex = 0;
    this.currentChoicesIndex = 0;
  }

  run() {
    this.displayScene();
  }

  displayScene() {
    const scene = this.scenes[this.currentSceneIndex];
    const container = document.getElementById("story-container");

    if (!scene){

      this.currentSceneIndex = 0;
      this.currentChoicesIndex = 0;
      clearOptions(container);
      fetchStoryData();
      
    } else {

      if (this.currentSceneIndex === 0){

        clearOptions(container);

        const titleElement = document.createElement("h1");
        titleElement.textContent = this.title;
        container.appendChild(titleElement);
      } 

      if (this.currentSceneIndex > 0) {
        let sceneTitle = document.createElement("div");
        sceneTitle.className = "scene-title";
        let sceneParagraph = document.createElement("p");
        let sceneTextNode = document.createTextNode(scene.title);
        sceneTitle.appendChild(sceneTextNode);
        container.children[1].appendChild(sceneTitle);
      }

      let sceneContainer;

      if (!document.querySelector(".scene")) {
      
        const sceneElement = document.createElement("div");
        sceneElement.className = "scene";
        const sceneTextNode = document.createTextNode(scene.text);
        sceneElement.appendChild(sceneTextNode);
        container.appendChild(sceneElement);  
      } else {
        sceneContainer = document.querySelector(".scene");
      }

      if (scene.choices.length > 0) {
        let optionsElement = printChoices(scene.choices, this);
        container.appendChild(optionsElement);
      }

    }
  }

  displayChoices(containerToPrintChoices, choices, story) {

    this.currentChoicesIndex = 0;
    clearOptions(containerToPrintChoices);
    let newOptionsContainer = printChoices(choices, this);

    for (const childButton of newOptionsContainer.children) {

      let nodeCloned = childButton.cloneNode(true);
      nodeCloned.id = this.currentChoicesIndex;

      nodeCloned.addEventListener("click", () => {
      
        this.currentChoicesIndex = nodeCloned.id;

        if (choices[this.currentChoicesIndex].choices != null) {
          
          if (choices[this.currentChoicesIndex].choices.length > 0) {
            
            story.displayChoices(containerToPrintChoices, choices[this.currentChoicesIndex].choices, story);
          }

        } else {
          story.currentSceneIndex++;
          changeScene(story);
        }
      });

      this.currentChoicesIndex++;

      containerToPrintChoices.appendChild(nodeCloned);
    }

  }
}

function printChoices(choices, story) {

  let optionsContainer = document.querySelector(".options");
  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  choices.forEach(choice => {
    const optionButton = document.createElement("button");
    optionButton.textContent = choice.text;
    optionButton.className = "btn2";
    optionButton.addEventListener("click", () => {
      
      if (choice.choices != null) {
        
        if (choice.choices.length > 0) {
          
          story.displayChoices(optionsElement, choice.choices, story);
        } else {
          story.currentSceneIndex++;
          changeScene(story);
        }
      } else {
        story.currentSceneIndex++;
        changeScene(story);
      }
    });
    
    optionsElement.appendChild(optionButton);
  });

  return optionsElement;
}

function clearOptions(containerToRemoveContent) {
  
  while (containerToRemoveContent.firstChild) {
    containerToRemoveContent.removeChild(containerToRemoveContent.firstChild);
  }

  return containerToRemoveContent;
}

function removeContainer(containerToDelete) {
  
  containerToDelete.remove();
}

function changeScene(story) {
  
  let optionsContainer = document.querySelector(".options");
  let sceneContainer = document.querySelector(".scene");
  removeContainer(optionsContainer);
  clearOptions(sceneContainer);

  story.displayScene();
}

fetch("stories/json/stories.json")
  .then(response => response.json())
  .then(data => {
    const storyList = data.stories;
    showStoryOptions(storyList);
  })
  .catch((error) => {
    console.error("Error al cargar la lista de historias (json):", error);
  });

async function fetchStoryData() {
  await fetch("stories/json/stories.json")
  .then(response => response.json())
  .then(data => {
    const storyList = data.stories;
    showStoryOptions(storyList);
  })
  .catch((error) => {
    console.error("Error al cargar la lista de historias (json):", error);
  });
}

function showStoryOptions(storyList) {
  const storyContainer = document.getElementById("story-container");

  const storyListElement = document.createElement("ul");

  storyList.forEach((story, index) => {
    const listItem = document.createElement("button");
    listItem.textContent = `${story.title}`;
    listItem.className = "btn2";
    listItem.addEventListener("click", () => {
      loadStory(story.file);
    });

    storyListElement.appendChild(listItem);
  });

  storyContainer.appendChild(storyListElement);
}

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