/* // Vertical Tabs functions
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click(); */

/* ---------------------DARK MODE--------------------- */
const themeButton = document.getElementById("themeButton");
const iconMode = document.getElementById("iconMode");
const prefersDarkMode = window.matchMedia("(prefers-color-schema: dark)").matches;

function isDarkMode() {
  return prefersDarkMode || document.body.classList.contains("dark-mode");
}

function updateIcon(isDarkMode) {
  iconMode.textContent = isDarkMode ? "dark_mode" : "light_mode";
}

themeButton.addEventListener("click",() => {
  document.body.classList.toggle("dark-mode");
  const currentMode = isDarkMode();
  updateIcon(currentMode);
});

const currentMode = isDarkMode();
updateIcon(currentMode);