//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();

function setup() {
  render(allEpisodes);
  createDropDown(allEpisodes);
}


function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  // clear the page before displaying the episodes
  rootElem.innerHTML = "";
  episodeList.forEach(episode => {
    let episodeBlock = createEpisodeBlock(episode);
    rootElem.appendChild(episodeBlock);
  });
}


function createDropDown(episodeList) {
  const dropDown = document.getElementById("episodeDropDownList");

  // delete the previously created options before proceeding
  dropDown.innerHTML="";

  let firstOption = document.createElement("option");
  firstOption.textContent = "All episodes";
  dropDown.add(firstOption);

  episodeList.forEach(episode => {
    let dropDownOption = document.createElement("option");
    dropDownOption.textContent = `S${zeroPad(episode.season, 2)}E${zeroPad(episode.number, 2)} - ${episode.name}`;

    dropDownOption.value = episode.name;

    dropDown.add(dropDownOption);
  });

  dropDown.addEventListener("change", event => {

    console.log(event.target.value);
    if(event.target.value === "All episodes") {
      render(allEpisodes);
    }
    else {
      // let episodeName = event.target.value.slice(event.target.value.indexOf("-") + 2);
      // console.log(episodeName);

      // let episodeToDisplay = episodeList.filter(episode => episode.name === episodeName);

      let episodeToDisplay = episodeList.filter(episode => episode.name === event.target.value);

      console.log(episodeToDisplay);
      render(episodeToDisplay);
    }
    // console.log(event.target.value.slice(event.target.value.indexOf("-") + 2));
  });
}


function render(episodeList) {
  makePageForEpisodes(episodeList);
  // createDropDown(episodeList);
}


function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}


function createEpisodeBlock(episode) {
  let episodeBlock = document.createElement("div");
  episodeBlock.className = "episodeBlock";
  let innerHTML = `<h2 class="episodeTitle">${episode.name}
    <span class="episodeCode">S${zeroPad(episode.season, 2)}E${zeroPad(episode.number, 2)}</span>
    </h2>
    <hr>
    <img src="${episode.image.medium}">
    <h3 class="summaryTitle">Summary:</h3>
    <div class="summaryText">${episode.summary}</div>
    <a class="episodeLink" href=${episode.url} target="_blank">More...</a>`;
  episodeBlock.innerHTML = innerHTML;
  return episodeBlock;
}


function liveSearch() {
  const input = document.querySelector('input');
  let numOfEpisodes = document.getElementById("numOfEpisodes");

  input.addEventListener('keyup', searchEpisodes);

  function searchEpisodes(event) {

    let searchString = event.target.value.toLowerCase();
    let searchResult = [];

    if(searchString === "") {
      searchResult = allEpisodes;
      numOfEpisodes.innerHTML = "";
    }
    else {
      searchResult = allEpisodes.filter(episode => {
        return (episode.name.toLowerCase().search(searchString) !== -1) || (episode.summary.toLowerCase().search(searchString) !== -1);
      });
      numOfEpisodes.innerHTML =
        `Displaying : ${searchResult.length} / ${allEpisodes.length} episodes`;
    }

    console.log("this is the search term : " + searchString);
    console.log("search result");
    console.log(searchResult);

    //render the page again with the search results
    render(searchResult);
  }
}


window.onload = setup;
liveSearch();
