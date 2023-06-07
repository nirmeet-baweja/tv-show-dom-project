/**
 * Event listener for "All Shows" button. Renders all the shows on the screen
 * @param {Object} event
 */
function allShowsBtnEventHandler(event) {
  event.preventDefault();
  render(allShows, SHOW);
  // Reset the values of both of the drop down menus.
  showDropdown.selectedIndex = 0;
  episodeDropdown.selectedIndex = 0;

  /*
   When showing all shows on the screen,
   the drop down menu for episodes should be empty.
   */
  allEpisodes = [];
  createEpisodeDropdown(allEpisodes);
}

/*****************************************************************************/

/**
 * The event handler for the show titles.
 * If a show title is clicked, displays all the episodes of corresponding show
 */
function createShowTitleEventListener() {
  let showTitles = document.querySelectorAll(".showTitle");
  showTitles.forEach((showTitle) => {
    showTitle.addEventListener("click", () => {
      showDropdown.value = showTitle.id;
      showDropdownEventListener(showTitle.id);
    });
  });
}

/*****************************************************************************/

/**
 * Creates an HTML block with all the needed show data.
 * This block can then be appended to the DOM to display the show.
 * @param {{name: String, image: Object, summary: String, url: String, rating: Object, genre: [String], status: String, runtime: Number}} show - A single show passed as a parameter
 * @returns An HTML div element that contains the show data,
 *  enclosed in HTML tags.
 */
function createShowBlock(show) {
  // create the div element that will contain all the episode info
  let showBlock = document.createElement("div");
  /*
   assign the episodeBlock a class "episodeBlock",
   this class is then used to apply CSS styling
  */
  showBlock.className = "showBlock";

  /*
   Populate the innerHTML variable with the show title, image, summary
   and other information
  */
  let imgSrc;
  if (show.image === null) {
    imgSrc = "resources/old-tv-static.jpg";
  } else {
    imgSrc = show.image.medium;
  }

  let innerHTML = `<h2 class="showTitle" id="${show.id}">${show.name}</h2>
    <hr>
    <img src="${imgSrc}">
    <div class="summary">
      <h3 class="summaryTitle">Summary:</h3>
      <div class="summaryText, showSummary">${show.summary}</div>
      <a class="showLink" href=${show.url} target="_blank">More...</a>
    </div>
    <div class="info">
      <ul class="infoList">
      <li>Rating : ${show.rating.average}</li>
      <li>Genre : ${show.genres.join(", ")}</li>
      <li>Status : ${show.status}</li>
      <li>Runtime : ${show.runtime}</li>
      </ul>
    </div>`;

  showBlock.innerHTML = innerHTML;
  return showBlock;
}

/*****************************************************************************/

/**
 * Filter the episodes based on the characters typed in the search bar
 * and render the page for the filtered episodes.
 * The characters typed in the search bar are matched with the
 * episode title and episode summary. All the episodes with a positive match
 * are displayed on the webpage.
 */
function searchShows() {
  let numOfEpisodes = document.getElementById("numOfEpisodes");
  let searchString = searchBar.value.toLowerCase();
  let searchResult = [];

  if (searchString === "") {
    /*
     If the search string is empty, no search is made.
     Thus, all episodes should be displayed
    */
    searchResult = allShows;
    numOfEpisodes.innerHTML = "";
  } else {
    /*
     If something is typed in the search bar filter all shows,
     based on title, summary and genres.
    */

    searchResult = allShows.filter((show) => {
      // if show summary is null, use empty string instead
      let showSummary = show.summary || "";

      // check if the search term is found in the show.genres array
      let isFoundInGenre = show.genres.some((genre) => {
        return genre.toLowerCase().includes(searchString);
      });

      return (
        // Change everything to lower case to make the search case-insensitive.
        show.name.toLowerCase().search(searchString) !== -1 ||
        showSummary.toLowerCase().search(searchString) !== -1 ||
        isFoundInGenre
      );
    });

    /*
      Display a message telling the user number of shows matching the search
    */
    numOfEpisodes.innerHTML = `Displaying : ${searchResult.length} / ${allShows.length} shows`;
  }

  /*
   Render the webpage with the filtered search results
  */
  render(searchResult, SHOW);
}

/*****************************************************************************/

/**
 * Renders all the episodes of the selected show
 * on the screen i.e. on the DOM
 * @param {Number} showID
 */
async function showDropdownEventListener(showID) {
  /*
   First method -
  */
  if (showID === "Select a show") {
    render(allShows, SHOW);
    allEpisodes = [];
  } else {
    let episodesToDisplay = await fetchAllEpisodes(showID);
    allEpisodes = await episodesToDisplay;
    render(allEpisodes, EPISODE);
  }
  createEpisodeDropdown(allEpisodes);
}

/*****************************************************************************/
/**
 * Creates the dropdown menu of shows and adds the eventListener to
 * display the chosen show from the dropdown.
 * @param {Array} showList
 */
function createShowDropdown(showList) {
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
  firstOption.textContent = "Select a show";
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
  showDropdown.addEventListener("change", () => {
    showDropdownEventListener(showDropdown.value);
  });
}
