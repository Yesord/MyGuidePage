const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  {
    title: "One Last Kis",
    name: "宇多田ヒカル",
    source:
      "https://github.com/Yesord/Yesord.github.io/raw/main/dist/Music/OneLastKiss.mp3",
  },
  {
    title: "Lemon",
    name: "米津玄師",
    source:
      "https://github.com/Yesord/Yesord.github.io/raw/main/dist/Music/Lemon.mp3",
  },
  {
    title: "悪魔の子",
    name: "ヒグチアイ",
    source:
      "https://github.com/Yesord/Yesord.github.io/raw/main/dist/Music/悪魔の子.mp3",
  },
  {
    title: "残酷な天使のテーゼ",
    name: "高橋洋子",
    source:
      "https://github.com/Yesord/Yesord.github.io/raw/main/dist/Music/残酷天使的行动纲领.mp3",
  },
  {
    title: "消えてしまいそうです",
    name: "ずっと真夜中でいいのに。",
    source:
      "https://github.com/Yesord/Yesord.github.io/raw/main/dist/Music/消えてしまいそうです.mp3",
  },

  {
    title: "丑八怪",
    name: "薛之谦",
    source:
      "https://github.com/Yesord/Yesord.github.io/raw/main/dist/Music/丑八怪.mp3",
  },
  {
    title: "天外来物",
    name: "薛之谦",
    source:
      "https://github.com/Yesord/Yesord.github.io/raw/main/dist/Music/天外来物.mp3",
  },
];

let currentSongIndex = 3;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  song.addEventListener("loadeddata", () => {});
}

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
  currentSongIndex = (swiper.activeIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex); 
  playSong(); 
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});

progress.addEventListener("change", () => {
  playSong();
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 3,
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});

swiper.on("slideChange", () => {
  currentSongIndex = swiper.activeIndex;
  updateSongInfo(); 
  playPause(); 
});