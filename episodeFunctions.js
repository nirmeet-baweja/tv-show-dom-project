/**
 * To add leading zeroes to a number
 * @param {Number} num - the number to which leading zeroes are to be added
 * @param {Number} places - the number of digits the final result should have
 * @returns {String} A string containing the num with added leading zeroes to it
 */
function zeroPad(num, places) {
  // calculate the number of zeroes that need to be prepended to num
  let zero = places - num.toString().length + 1;

  return Array(+(zero > 0 && zero)).join("0") + num;
}

/*****************************************************************************/

/**
 * To create an HTML block for a single episode.
 * Creates an HTML block with all the needed episode data.
 * This block can then be appended to the DOM to display the episode.
 * @param {{image: Object, summary: String, name: String,
 *  number: Number, season: Number}} episode - A single single episode passed as an object
 * @returns An HTML div element that contains the episode data,
 *  enclosed in HTML tags.
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
  let imgSrc, episodeSummary;
  if (episode.image === null) {
    imgSrc = "resources/old-tv-static.jpg";
  } else {
    imgSrc = episode.image.medium;
  }

  if (episode.summary === null || episode.summary === "") {
    episodeSummary = "Check again later for latest updates!";
  } else {
    episodeSummary = episode.summary;
  }

  let innerHTML = `<h2 class="episodeTitle">${episode.name}
    <span class="episodeCode">
    S${zeroPad(episode.season, 2)}E${zeroPad(episode.number, 2)}
    </span>
    </h2>
    <hr>
    <img src="${imgSrc}">
    <h3 class="summaryTitle">Summary:</h3>
    <div class="summaryText">${episodeSummary}</div>
    <a class="episodeLink" href=${episode.url} target="_blank">More...</a>`;

  episodeBlock.innerHTML = innerHTML;
  return episodeBlock;
}

/*****************************************************************************/

/**
 * Filter the episodes based on the characters typed in the search bar
 * and render the page for the filtered episodes.
 * The characters typed in the search bar are matched with the
 * episode title and episode summary. All the episodes with a positive match
 * are displayed on the webpage.
 */
function searchEpisodes() {
  let numOfEpisodes = document.getElementById("numOfEpisodes");
  let searchString = searchBar.value.toLowerCase();
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
     If something is typed in the search bar filter all episodes,
     based on title and summary.
    */

    searchResult = allEpisodes.filter((episode) => {
      let episodeSummary = episode.summary || "";
      return (
        // Change everything to lower case to make the search case-insensitive.
        episode.name.toLowerCase().search(searchString) !== -1 ||
        episodeSummary.toLowerCase().search(searchString) !== -1
      );
    });
    /*
      Display a message telling the user number of episodes matching the search
    */
    numOfEpisodes.innerHTML = `Displaying : ${searchResult.length} / ${allEpisodes.length} episodes`;
  }

  /*
   Render the webpage with the filtered search results
  */
  render(searchResult, EPISODE);
}

/*****************************************************************************/

/**
 * Event listener for the episode dropdown.
 * Renders the selected episode on the screen i.e. on the DOM
 * @param {Object} event
 */
function episodeDropdownEventListener(event) {
  /*
   There are two ways in which the dropdown can render a single episode
   on the screen. Only one of the two methods should be uncommented at a time.
  */

  /*
   First method -
  */

  console.log(event.target.value);
  if (event.target.value === "All episodes") {
    render(allEpisodes, EPISODE);
  } else {
    let episodeToDisplay = allEpisodes.filter(
      (episode) => episode.name === event.target.value
    );
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
  //   searchBar.value = "";
  // } else {
  //   searchBar.value = event.target.value;
  // }
  // searchEpisodes();
}

/*****************************************************************************/

/**
 * Creates the dropdown menu of episodes and adds the eventListener to
 * display the chosen episode from the dropdown.
 * @param {Array} episodeList
 */
function createEpisodeDropdown(episodeList) {
  console.log("creating episode dropdown");
  console.log(!episodeList.length);
  if (!episodeList.length) {
    episodeDropdown.style.display = "none";
  } else {
    episodeDropdown.style.display = "inline-block";
  }
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

/*****************************************************************************/

/**
 * To fetch episodes using the Fetch API
 * @param{Number} showID
 * @return{Array} An array of episodes (i.e. an array objects)
 */
async function fetchAllEpisodes(showID) {
  let promise = await fetch(`https://api.tvmaze.com/shows/${showID}/episodes`);
  let episodes = await promise.json();
  return episodes;
}
