let inputEle = document.querySelector("#input");
let searchEle = document.getElementById("search");
let output = document.querySelector("#meaning");
let audioEle = document.getElementById("pronunciation");
let inputWord = document.querySelector("#searchedword");
var url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

search.addEventListener("click", () => {
  if (inputEle.value != "") {
    fetchingData();
  }
});
window.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && inputEle.value != "") {
    fetchingData();
  }
});

function fetchingData() {
  //Using Fetch Method
  fetch(url + inputEle.value)
    .then((response) => {
      return response.json();
    })
    .then((readableFormat) => {
      let audioLink = readableFormat[0].phonetics[0].audio;
      setAudio(audioLink);
      inputWord.innerText = `${readableFormat[0].word}`;
      definition(readableFormat);
    })
    .catch((error) => {
      console.log(`Error : ${error}`);
    });
}

function definition(readableFormat) {
  let totalMeanings = readableFormat[0].meanings.length;
  output.innerHTML = "";
  if (totalMeanings != 0) {
    for (let i = 0; i < totalMeanings; i++) {
      if (i == 0) {
        output.innerHTML += `<h3><u>As Noun : </u></h3><br><br>${traverse(
          readableFormat[0].meanings[i].definitions
        )}`;
      }
      if (i == 1) {
        output.innerHTML += `<br><h3><u>As Verb : </u></h3><br><br>${traverse(
          readableFormat[0].meanings[i].definitions
        )}`;
      }
      if (i == 2) {
        output.innerHTML += `<br><h3><u>As Adjective : </u></h3><br><br>${traverse(
          readableFormat[0].meanings[i].definitions
        )}`;
      }
    }
  }
}

function traverse(arr) {
  let result = new Array();
  for (item of arr) {
    result.push(item.definition + " <br>");
  }
  return result.join("<br>");
}

function setAudio(link) {
  if (link != "") {
    audioEle.setAttribute("src", `${link}`);
  } else {
    audioEle.setAttribute("src", `./audio nhi mila.mp3`);
  }
}

function playAudio() {
  var audio = document.getElementById("pronunciation");
  audio.play();
}
