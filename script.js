//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();

function setup() {
  render(allEpisodes);
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


window.onload = setup;
