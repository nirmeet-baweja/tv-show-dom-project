/*****************************************************************************/

/*
 * Declaring the Global Variables
 */

// Flags used in the render function, to chose what is being rendered on screen
const SHOW = "show";
const EPISODE = "episode";
let showingOnScreen;

// An array containing the list of all the shows
let allShows;
// An array of objects containing the list of all the episodes
// of the selected show
let allEpisodes;
// DOM element called root that contains the episodes / shows
const rootElem = document.getElementById("root");
// DOM element for the episode search bar
const searchBar = document.querySelector(".searchBar");
// All Shows button
const allShowsBtn = document.getElementById("allShowsBtn");
// Episodes dropdown menu
const episodeDropdown = document.getElementById("episodeDropDownList");
// Shows dropdown menu
const showDropdown = document.getElementById("showDropDownList");

/*****************************************************************************/

/*
 * Role - To display the episode / show list.
 * Parameter - Takes 2 parameters
 *  the array of objects (episode or show) as a parameter.
 *  type of array - SHOW or EPISODE
 * Result - Displays the episodes / shows on the page using DOM manipulation.
 */
function render(list, type) {
  /*
   clear the root element before displaying the episode list
   this step is important to clear any previously displayed episodes
  */
  rootElem.innerHTML = "";

  list.forEach((element) => {
    let htmlBlock;
    /*
     create the HTML episode tile for each episode in the list
    */
    if (type === SHOW) {
      showingOnScreen = SHOW;
      htmlBlock = createShowBlock(element);
    } else if (type === EPISODE) {
      showingOnScreen = EPISODE;
      htmlBlock = createEpisodeBlock(element);
    }

    /*
     then append each episode / show to the root element (i.e. to the DOM)
    */
    rootElem.appendChild(htmlBlock);
  });
}

/*****************************************************************************/

/*
 * Role - To do the page setup.
 * Parameter - None
 * Result - Completes the page setup and called on window load.
 */
function setup() {
  // get all shows from show.js file
  allShows = getAllShows();

  // Sort the showList by name before creating the htmlBlock for each show
  allShows.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  // add the event listener to the all shows button
  allShowsBtn.addEventListener("click", allShowsEventListener);
  // initialise allEpisodes to empty array, as no show is selected yet.
  allEpisodes = [];
  // render the page
  render(allShows, "show");
  // create the show dropdown
  createShowDropdown(allShows);
  // create the episode dropdown
  createEpisodeDropdown(allEpisodes);
  // add the event listener to the search field
  searchBar.addEventListener("keyup", (event) => {
    if (showingOnScreen === EPISODE) {
      searchEpisodes();
    } else if (showingOnScreen === SHOW) {
      searchShows();
    }
  });
}

/*****************************************************************************/

window.onload = setup;
