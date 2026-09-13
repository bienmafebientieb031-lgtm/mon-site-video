/*
  AJOUTE TES VIDÉOS DANS CE TABLEAU.

  videoId = l'identifiant dans l'URL YouTube.
  Exemple :
  https://www.youtube.com/watch?v=ABC123
  videoId = "ABC123"
*/

const videos = [
  {
    videoId: "M7lc1UVf-VE",
    title: "Exemple de vidéo YouTube",
    description: "Remplace cette vidéo par les tiennes."
  },
  {
    videoId: "dQw4w9WgXcQ",
    title: "Deuxième exemple",
    description: "Tu peux ajouter autant de vidéos que tu veux."
  }
];

let player;
let currentVideoId = null;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: videos[0]?.videoId || "",
    playerVars: {
      rel: 0,
      modestbranding: 1
    },
    events: {
      onReady: () => {
        if (videos.length > 0) {
          selectVideo(videos[0].videoId);
        }
      }
    }
  });
}

function renderVideos(filter = "") {
  const list = document.getElementById("videoList");
  const query = filter.trim().toLowerCase();

  const filtered = videos.filter(video =>
    video.title.toLowerCase().includes(query) ||
    video.description.toLowerCase().includes(query)
  );

  list.innerHTML = "";

  if (filtered.length === 0) {
    list.innerHTML = '<div class="no-results">Aucune vidéo trouvée.</div>';
    return;
  }

  filtered.forEach(video => {
    const button = document.createElement("button");
    button.className = "video-card";
    button.dataset.videoId = video.videoId;

    button.innerHTML = `
      <img
        class="thumbnail"
        src="https://i.ytimg.com/vi/${encodeURIComponent(video.videoId)}/mqdefault.jpg"
        alt=""
        loading="lazy"
      >
      <span class="card-title">${escapeHtml(video.title)}</span>
    `;

    button.addEventListener("click", () => selectVideo(video.videoId));
    list.appendChild(button);
  });

  updateActiveCard();
}

function selectVideo(videoId) {
  const video = videos.find(item => item.videoId === videoId);
  if (!video) return;

  currentVideoId = videoId;

  if (player && typeof player.loadVideoById === "function") {
    player.loadVideoById(videoId);
  }

  document.getElementById("videoTitle").textContent = video.title;
  document.getElementById("videoDescription").textContent = video.description;

  updateActiveCard();
}

function updateActiveCard() {
  document.querySelectorAll(".video-card").forEach(card => {
    card.classList.toggle("active", card.dataset.videoId === currentVideoId);
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

document.getElementById("searchInput").addEventListener("input", event => {
  renderVideos(event.target.value);
});

renderVideos();
