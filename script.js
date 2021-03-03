// An array of objects Containing the list of all the episodes
let allShows = getAllShows();
let allEpisodes;
const input = document.querySelector(".searchBar");
const SHOW = "show";
const EPISODE = "episode";

/*
 * Role - To add leading zeroes to a number
 * Parameter - Takes 2 parameters
 *  num - the number to which leading zeroes are to be added
 *  places - the number of digits the final result should have
 * Returns - A string containing the num with added leading zeroes to it.
 * Result - zeroPad(5, 3) gives the result as "005"
 */
function zeroPad(num, places) {
  // calculate the number of zeroes that need to be prepended to num
  let zero = places - num.toString().length + 1;

  return Array(+(zero > 0 && zero)).join("0") + num;
}

/*
 * Role - To create an HTML block for a single show
 * Parameter - A single show passed as a parameter
 * Returns - An HTML div element that contains the show data,
 *  enclosed in HTML tags.
 * Result - Creates an HTML block with all the needed show data.
 *  This block can then be appended to the DOM to display the show.
 */
function createShowBlock(show) {
  // create the div element that will contain all the episode info
  let showBlock = document.createElement("div");
  // console.log("create show block");
  // console.log(show);
  /*
   assign the episodeBlock a class "episodeBlock",
   this class is then used to apply CSS styling
  */
  showBlock.className = "showBlock";

  /*
   populate the innerHTML variable with the episode title, image and summary
  */
  let imgSrc = show.image.medium || "";

  let innerHTML = `<h2 class="showTitle">${show.name}</h2>
    <hr>
    <img src="${imgSrc}">
    <h3 class="summaryTitle">Summary:</h3>
    <div class="summaryText">${show.summary}</div>
    <a class="showLink" href=${show.url} target="_blank">More...</a>`;

  showBlock.innerHTML = innerHTML;
  return showBlock;
}

/*
 * Role - To create an HTML block for a single episode
 * Parameter - A single single episode passed as an object
 * Returns - An HTML div element that contains the episode data,
 *  enclosed in HTML tags.
 * Result - Creates an HTML block with all the needed episode data.
 *  This block can then be appended to the DOM to display the episode.
 */
function createEpisodeBlock(episode) {
  // create the div element that will contain all the episode info
  let episodeBlock = document.createElement("div");

  /*
   assign the episodeBlock a class "episodeBlock",
   this class is then used to apply CSS styling
  */
  episodeBlock.className = "episodeBlock";

  /*
   populate the innerHTML variable with the episode title, image and summary
  */
  let imgSrc = episode.image.medium || "";

  let innerHTML = `<h2 class="episodeTitle">${episode.name}
    <span class="episodeCode">
    S${zeroPad(episode.season, 2)} E${zeroPad(episode.number, 2)}
    </span>
    </h2>
    <hr>
    <img src="${imgSrc}">
    <h3 class="summaryTitle">Summary:</h3>
    <div class="summaryText">${episode.summary}</div>
    <a class="episodeLink" href=${episode.url} target="_blank">More...</a>`;

  episodeBlock.innerHTML = innerHTML;
  return episodeBlock;
}

/*
 * Role - To display the episode list.
 * Parameter - Takes the array of episodes (which are objects) as a parameter.
 * Result - Displays the episodes on the page using DOM manipulation.
 */
function render(list, type) {
  // get the root element that should contain the episodes, from the DOM
  const rootElem = document.getElementById("root");

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
      htmlBlock = createShowBlock(element);
    } else if (type === EPISODE) {
      htmlBlock = createEpisodeBlock(element);
    }

    /*
     then append each episode to the root element (i.e. to the DOM)
    */
    rootElem.appendChild(htmlBlock);
  });
}

/*
 * Role -
 * Parameter - Takes the array of episodes (which are objects) as a parameter.
 * Result - Displays the episodes on the webpage.
 */
// function render(episodeList) {
//   makePageForEpisodes(episodeList);
//   // createEpisodeDropdown(episodeList);
// }

/*
 * Role - Filter the episodes based on the characters typed in the search bar
    and render the page for the filtered episodes
 * Parameter - None
 * Returns - Nothing
 * Result - The characters typed in the search bar are matched with the
 *  episode title and episode summary. All the episodes with a positive match
 *  are displayed on the webpage.
 */
function searchEpisodes() {
  let numOfEpisodes = document.getElementById("numOfEpisodes");
  let searchString = input.value.toLowerCase();
  let searchResult = [];

  if (searchString === "") {
    /*
     If the search string is empty, no search is made.
     Thus, all episodes should be displayed
    */
    searchResult = allEpisodes;
    numOfEpisodes.innerHTML = "";
  } else {
    /*
     If something is typed in the search bar filter all episodes.
     The search made is case-insensitive.
    */
    searchResult = allEpisodes.filter((episode) => {
      return (
        episode.name.toLowerCase().search(searchString) !== -1 ||
        episode.summary.toLowerCase().search(searchString) !== -1
      );
    });
    /*
      Display a message telling the user number of episodes matching the search
    */
    numOfEpisodes.innerHTML = `Displaying : ${searchResult.length} / ${allEpisodes.length} episodes`;
  }

  // console.log("this is the search term : " + searchString);
  // console.log("search result");
  // console.log(searchResult);

  /*
   Render the webpage with the filtered search results
  */
  render(searchResult, EPISODE);
}

/*
 * Role - Event listener for the episode dropdown
 * Parameter - event
 * Returns - Nothing
 * Result - Render the selected episode on the screen i.e. on the DOM
 */
function episodeDropdownEventListener(event) {
  // console.log(event.target.value);

  /*
   There are two ways in which the dropdown can render a single episode
   on the screen. Only one of the two methods should be uncommented at a time.
  */

  /*
   First method -
  */

  if (event.target.value === "All episodes") {
    render(allEpisodes, EPISODE);
  } else {
    let episodeToDisplay = allEpisodes.filter(
      (episode) => episode.name === event.target.value
    );
    console.log(episodeToDisplay);
    render(episodeToDisplay, EPISODE);
  }

  /*
   Second Method - In this method the search bar is used to render the selected
   episode on the screen.
   The title of the selected episode is added to the search bar.
   Thus, it displays the corresponding episode.
   This algorithm assumes that each title is unique
   and that no episode title is a substring of another title.
   And it does not occur in the episode summary.
  */
  // if (event.target.value === "All episodes") {
  //   input.value = "";
  // } else {
  //   input.value = event.target.value;
  // }
  // searchEpisodes();
}

/*
 * Role - To create the dropdown menu of episodes.
 * Parameter - An array of episodes (which are objects) as a parameter.
 * Returns - Nothing
 * Result - Create the dropdown menu and add the eventListener to
 *  display the chosen episode from the dropdown.
 */
function createEpisodeDropdown(episodeList) {
  const episodeDropdown = document.getElementById("episodeDropDownList");

  /*
   delete the previously created options before proceeding
  */
  episodeDropdown.innerHTML = "";

  /*
   the first option in the dropdown is "All episodes"
   so that the user has a way to see all episodes.

   Create <option> for first option, add its value
   and then add it to <select>
  */
  let firstOption = document.createElement("option");
  firstOption.textContent = "All episodes";
  episodeDropdown.add(firstOption);

  /*
   create <option> for each episode, add its text and value,
   then append it to <select>
  */
  episodeList.forEach((episode) => {
    let dropDownOption = document.createElement("option");
    dropDownOption.textContent = `S${zeroPad(episode.season, 2)}E${zeroPad(
      episode.number,
      2
    )}
      - ${episode.name}`;

    dropDownOption.value = episode.name;

    episodeDropdown.add(dropDownOption);
  });

  /*
   add the eventListener to <select> i.e. the episode dropdown
  */
  episodeDropdown.addEventListener("change", episodeDropdownEventListener);
}

/*
 * Role - Event listener for the show dropdown
 * Parameter - event
 * Returns - Nothing
 * Result - Render all the episodes of the selected show
 * on the screen i.e. on the DOM
 */
async function showDropdownEventListener(event) {
  // console.log(event.target.value);
  /*
   First method -
  */
  console.log(event.target.value);
  if (event.target.value === "All shows") {
    render(allShows, SHOW);
    allEpisodes = [];
  } else {
    let episodesToDisplay = await fetchAllEpisodes(event.target.value);
    await render(episodesToDisplay, EPISODE);
    createEpisodeDropdown(episodesToDisplay);
    allEpisodes = episodesToDisplay;
  }
}

/*
 * Role -
 * Parameter -
 * Returns -
 * Result -
 */
function createShowDropdown(showList) {
  const showDropdown = document.getElementById("showDropDownList");

  /*
   delete the previously created options before proceeding
  */
  showDropdown.innerHTML = "";

  /*
   the first option in the dropdown is "All episodes"
   so that the user has a way to see all episodes.

   Create <option> for first option, add its value
   and then add it to <select>
  */
  let firstOption = document.createElement("option");
  firstOption.textContent = "All shows";
  showDropdown.add(firstOption);

  /*
   create <option> for each episode, add its text and value,
   then append it to <select>
  */
  showList.forEach((show) => {
    let dropDownOption = document.createElement("option");
    dropDownOption.textContent = show.name;

    dropDownOption.value = show.id;

    showDropdown.add(dropDownOption);
  });

  /*
   add the eventListener to <select> i.e. the episode dropdown
  */
  showDropdown.addEventListener("change", showDropdownEventListener);
}

/*
 * Role - To fetch episodes using the Fetch API
 * Parameter - None
 * Returns - An array of episodes (i.e. an array objects).
 */
async function fetchAllEpisodes(showID) {
  let promise = await fetch(`https://api.tvmaze.com/shows/${showID}/episodes`);
  let episodes = await promise.json();
  // console.log(episodes);
  return episodes;
}

/*
 * Role - To do the page setup.
 * Parameter - None
 * Result - Completes the page setup and called on window load.
 */
async function setup() {
  // allEpisodes = await fetchAllEpisodes(82);
  allEpisodes = [];

  /*
   Sort the shoList by name before creating the htmlBlock for each show
  */
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

  // console.log(allShows);

  render(allShows, "show");
  createEpisodeDropdown(allEpisodes);
  createShowDropdown(allShows);
  input.addEventListener("input", searchEpisodes);
  // fetchAllEpisodes();
}

window.onload = setup;
