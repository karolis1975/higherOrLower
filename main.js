const maxResults = 50;
const playListID = "PL6jGN3ysDGdZaLvN94mIztDphCuE4r34p";
const restAPI = "AIzaSyAfcKNQnKvviqc55JvgNHLbIP0ec6Sx1gQ";
let videoIDs = "";

const videos = [];

const gif = document.querySelector("#gif");
const gifImg = document.querySelector("#gif img");

const firstVideoImg = document.querySelector(".firstVideoImg");
const firstVideoTitle = document.querySelector(".firstVideoTitle");
const firstVideoViews = document.querySelector(".firstVideoViews");
const secondVideoViews = document.querySelector(".secondVideoViews");
const secondVideoViewsText = document.querySelector(".secondVideoViewsText");
const bothVideosDiv = document.querySelector(".bothVideos");
const secondVideoImg = document.querySelector(".secondVideoImg");
const secondVideoTitle = document.querySelector(".secondVideoTitle");

const higherBtn = document.querySelector(".higher");
const restartBtn = document.querySelector(".restart");
const lowerBtn = document.querySelector(".lower");
const scoreText = document.querySelector(".scoreText");
const highestScoreText = document.querySelector(".highestScoreText");
const bothVideos = document.querySelectorAll(".video");
const higherLower = document.querySelector(".higherLower");

const endScoreText = document.querySelector(".endScoreText");
const endScore = document.querySelector(".endScore");
const newHighScore = document.querySelector(".newHighScore");
const newHighScoreText = document.querySelector(".newHighScoreText");
const showResult = document.querySelector(".showResult");
const showResultIcon = document.querySelector(".showResult i");

let turn = 0;
let score = 0;
let highestScore = 0;
let newScore = false;
let nextTurn = false;

if (localStorage.getItem("score") != null)
  highestScore = localStorage.getItem("score");

getPlaylist();

higherBtn.addEventListener("click", isHigher);
restartBtn.addEventListener("click", playAgain);
lowerBtn.addEventListener("click", isLower);

function isHigher() {
  bothVideos[0].classList.remove("animate");
  bothVideos[1].classList.remove("animate");
  higherLower.style.cssText = "pointer-events: none";

  if (videos[turn + 1].views >= videos[turn].views) {
    nextTurn = true;
  } else {
    nextTurn = false;
    if (localStorage.getItem("score") == null) {
      localStorage.setItem("score", score);
      newScore = true;
    } else {
      if (localStorage.getItem("score") < score) {
        localStorage.setItem("score", score);
        newScore = true;
      }
    }
  }
  showViews();
}

function isLower() {
  higherLower.style.cssText = "pointer-events: none";
  bothVideos[0].classList.remove("animate");
  bothVideos[1].classList.remove("animate");
  if (videos[turn + 1].views <= videos[turn].views) {
    nextTurn = true;
  } else {
    nextTurn = false;
    if (localStorage.getItem("score") == null) {
      localStorage.setItem("score", score);
      newScore = true;
    } else {
      if (localStorage.getItem("score") < score) {
        localStorage.setItem("score", score);
        newScore = true;
      }
    }
  }
  showViews();
}

function showViews() {
  secondVideoViewsText.classList.add("showUpViews");
  secondVideoViews.textContent = videos[turn + 1].views.toLocaleString();
  setTimeout(whichResultIcon, 1000);
  if (nextTurn) {
    turn++;
    score++;
    if (turn == videos.length - 1) {
      turn = 0;
      shuffleVideos(videos);
    }
    setTimeout(main, 2000);
  } else {
    setTimeout(restart, 2000);
  }
}

function whichResultIcon() {
  showResult.style.cssText = "animation: popUp 0.2s forwards";
  showResultIcon.style.cssText = "animation: icon 0.5s 0.2s forwards";
  if (nextTurn) {
    showResult.style.background = "rgb(93, 197, 93)";
    showResultIcon.className = "fas fa-check";
  } else {
    showResult.style.background = "rgb(255, 80, 80)";
    showResultIcon.className = "fas fa-times";
  }
}

function playAgain() {
  bothVideos[0].style.display = "block";
  bothVideos[1].style.display = "block";
  bothVideosDiv.style.cssText = "justify-content: space-between";
  gif.style.display = "none";
  endScoreText.style.visibility = "hidden";
  restartBtn.style.display = "none";
  newHighScore.style.visibility = "hidden";
  lowerBtn.style.display = "inline-block";
  higherBtn.style.display = "inline-block";
  score = 0;
  turn = 0;
  newScore = false;
  shuffleVideos(videos);
  main();
}
function restart() {
  let whichGif = "";
  let randomGifNr = null;
  let madGifs = [
    "https://media.giphy.com/media/Ej0sZ2rPd2uXu/giphy.gif",
    "https://media.giphy.com/media/MddlXUAhRFPVDN2Oqv/giphy.gif",
    "https://media.giphy.com/media/WsMNEPBsQr89wEeTNy/giphy.gif",
    "https://media.giphy.com/media/MAd1yFDSBIhJOEO2NE/giphy.gif",
    "https://media.giphy.com/media/e2lsrs1pPy4Uw/giphy.gif",
    "https://media.giphy.com/media/cP0WQTZpeTmZJNXYOP/giphy.gif",
    "https://media.giphy.com/media/eGrYr7UkywqhIBlWth/giphy.gif",
    "https://media.giphy.com/media/RJd1Joz3aDiDijODdY/giphy.gif",
    "https://media.giphy.com/media/RN2n6Wtc6CoZ274VBX/giphy.gif",
    "https://media.giphy.com/media/WNiWlEpVNf4lyqgDg8/giphy.gif",
  ];
  let happyGifs = [
    "https://media.giphy.com/media/ZArWQGxulwNxty4ck4/giphy.gif",
    "https://media.giphy.com/media/dUUIVmygw4Ik76Y2h9/giphy.gif",
    "https://media.giphy.com/media/keUm5tRMxoniSyYWan/giphy.gif",
    "https://media.giphy.com/media/l0drQbYgrDmuPuk9S1/giphy.gif",
    "https://media.giphy.com/media/iexvbJDqc2wRxdVGMf/giphy.gif",
    "https://media.giphy.com/media/Rgc7pvWsESXgNOsMBL/giphy.gif",
    "https://media.giphy.com/media/cjhYGOyNverJiecLyF/giphy.gif",
    "https://media.giphy.com/media/jVAt83ieT49H6ja5Ty/giphy.gif",
    "https://media.giphy.com/media/TcdpZwYDPlWXC/giphy.gif",
    "https://media.giphy.com/media/H1Y8KOv3ouYPoZyjUz/giphy.gif",
  ];

  randomGifNr = Math.floor(Math.random() * 10);

  if (score < 5) {
    whichGif = madGifs[randomGifNr];
  } else {
    whichGif = happyGifs[randomGifNr];
  }
  showResult.style.cssText = "animation: popDown 0.2s forwards";
  showResultIcon.style.cssText = "animation: none";
  bothVideos[0].style.display = "none";
  bothVideos[1].style.display = "none";
  bothVideosDiv.style.cssText = "justify-content: center";
  gifImg.src = whichGif;
  gif.style.display = "block";
  endScoreText.style.visibility = "visible";
  endScore.textContent = score;
  restartBtn.style.display = "block";
  lowerBtn.style.display = "none";
  higherBtn.style.display = "none";
  secondVideoViewsText.classList.remove("showUpViews");
  if (newScore) {
    newHighScore.style.visibility = "visible";
    newHighScoreText.textContent = localStorage.getItem("score");
  }
}

function shuffleVideos(videos) {
  for (let i = videos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [videos[i], videos[j]] = [videos[j], videos[i]];
  }
  for (let i = 0; i < videos.length; i++) {
    videos[i].views = Math.floor(videos[i].views / 1000000);
    videos[i].views *= 1000000;
  }
}

function main() {
  showResult.style.cssText = "animation: popDown 0.2s forwards";
  showResultIcon.style.cssText = "animation: none";
  secondVideoViewsText.classList.remove("showUpViews");
  bothVideos[0].classList.add("animate");
  bothVideos[1].classList.add("animate");
  higherLower.style.cssText = "pointer-events: initial";

  scoreText.textContent = score;
  highestScoreText.textContent = highestScore;
  firstVideoImg.src = videos[turn].image;
  firstVideoTitle.textContent = videos[turn].title;
  firstVideoViews.textContent = videos[turn].views.toLocaleString();

  secondVideoTitle.textContent = videos[turn + 1].title;
  secondVideoImg.src = videos[turn + 1].image;
}

function getPlaylist() {
  $.getJSON(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playListID}&key=${restAPI}`,
    function (data) {
      for (let i = 0; i < maxResults; i++) {
        let videoId = data.items[i].snippet.resourceId.videoId;
        if (i == maxResults - 1) videoIDs += videoId;
        else videoIDs += videoId + ",";
      }
      getVideo();
    }
  );
}

function getVideo() {
  $.getJSON(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoIDs}&key=${restAPI}&part=snippet,statistics`,
    function (data) {
      for (let i = 0; i < maxResults; i++) {
        const videoInfo = {
          views: data.items[i].statistics.viewCount,
          title: data.items[i].snippet.localized.title,
          image: data.items[i].snippet.thumbnails.high.url,
        };
        videos.push(videoInfo);
      }
      shuffleVideos(videos);
      main();
    }
  );
}
