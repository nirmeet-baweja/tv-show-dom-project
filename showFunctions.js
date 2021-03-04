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
  let imgSrc;
  if (show.image === null) {
    imgSrc = "resources/old-tv-static.jpg";
  } else {
    imgSrc = show.image.medium;
  }

  let innerHTML = `<h2 class="showTitle">${show.name}</h2>
    <hr>
    <img src="${imgSrc}">
    <h3 class="summaryTitle">Summary:</h3>
    <div class="summaryText">${show.summary}</div>
    <a class="showLink" href=${show.url} target="_blank">More...</a>`;

  showBlock.innerHTML = innerHTML;
  return showBlock;
}

/*****************************************************************************/

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
    allEpisodes = await episodesToDisplay;
    render(allEpisodes, EPISODE);
  }
  createEpisodeDropdown(allEpisodes);
}

/*****************************************************************************/

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
