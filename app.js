const musicContainer = document.getElementById("music-container"),
  playBtn = document.getElementById("play"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  audio = document.getElementById("audio"),
  progress = document.getElementById("progress"),
  progressContainer = document.getElementById("progress-container"),
  title = document.getElementById("title"),
  cover = document.getElementById("cover"),
  songs = ["hey", "summer", "ukulele"];

// keep track of song
let songIndex = 2;

// initialy load song details into DOM
loadSong(songs[songIndex]);

// update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
}

// pause song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
}

// set progress bar
function setProgress(e) {
  const width = this.clientWidth,
    clickX = e.offsetX,
    duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

// change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// time song update event
audio.addEventListener("timeupdate", updateProgress);

// click on progress bar
progressContainer.addEventListener("click", setProgress);

// song ends
audio.addEventListener("ended", nextSong);
