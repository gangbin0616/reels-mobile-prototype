const reels = [
  {
    author: "@mira.studio",
    avatar: "M",
    caption: "새벽 작업실 무드. 유리, 금속, 낮은 베이스라인.",
    sound: "original audio - mira",
    likes: 28400,
    comments: 418,
    image:
      "linear-gradient(135deg, #0f172a 0%, #164e63 34%, #14b8a6 68%, #f8fafc 100%)",
    thread: [
      ["J", "조명 톤이 진짜 좋다"],
      ["S", "저장해두고 레퍼런스로 볼게요"],
      ["N", "이런 질감으로 더 올려주세요"],
    ],
  },
  {
    author: "@noon.archive",
    avatar: "N",
    caption: "도시 산책 12초. 손떨림까지 그대로 살린 컷.",
    sound: "street loop - noon",
    likes: 91300,
    comments: 1204,
    image:
      "linear-gradient(160deg, #18181b 0%, #3f3f46 24%, #a1a1aa 50%, #fbbf24 72%, #7f1d1d 100%)",
    thread: [
      ["A", "컷 넘어가는 타이밍 미쳤다"],
      ["R", "색감이 필름 같음"],
      ["Y", "다음에는 밤 버전도 보고 싶어요"],
    ],
  },
  {
    author: "@flow.table",
    avatar: "F",
    caption: "책상 위에서 만드는 미니 루틴. 커피, 노트, 25분 집중.",
    sound: "focus room - flow",
    likes: 16800,
    comments: 205,
    image:
      "linear-gradient(145deg, #064e3b 0%, #10b981 28%, #e2e8f0 54%, #334155 78%, #020617 100%)",
    thread: [
      ["K", "타이머 UI도 같이 있으면 좋겠다"],
      ["B", "아침 루틴으로 따라 해봅니다"],
      ["H", "소리 조합 좋네요"],
    ],
  },
  {
    author: "@signal.room",
    avatar: "S",
    caption: "한 장면에 시선이 머무는 법. 여백을 크게 잡기.",
    sound: "soft pulse - signal",
    likes: 57200,
    comments: 733,
    image:
      "linear-gradient(130deg, #020617 0%, #1e293b 30%, #be123c 58%, #fda4af 82%, #f8fafc 100%)",
    thread: [
      ["D", "여백 설명 없이도 바로 느껴짐"],
      ["P", "이 스타일로 템플릿 만들고 싶다"],
      ["L", "사운드 어디서 구했나요?"],
    ],
  },
];

const state = {
  index: 0,
  liked: new Set(),
  saved: new Set(),
  muted: false,
  following: new Set(),
};

const feed = document.querySelector("#feed");
const likeBtn = document.querySelector("#likeBtn");
const saveBtn = document.querySelector("#saveBtn");
const soundBtn = document.querySelector("#soundBtn");
const followBtn = document.querySelector("#followBtn");
const author = document.querySelector("#author");
const avatarInitial = document.querySelector("#avatarInitial");
const caption = document.querySelector("#caption");
const soundName = document.querySelector("#soundName");
const likeCount = document.querySelector("#likeCount");
const commentCount = document.querySelector("#commentCount");
const commentSheet = document.querySelector("#commentSheet");
const shareSheet = document.querySelector("#shareSheet");
const commentList = document.querySelector("#commentList");
const commentForm = document.querySelector("#commentForm");
const commentInput = document.querySelector("#commentInput");
const heartBurst = document.querySelector("#heartBurst");

function formatCount(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${Math.round(value / 1000)}K`;
  return String(value);
}

function renderFeed() {
  feed.innerHTML = reels
    .map(
      (reel, index) => `
        <article class="reel ${index === state.index ? "is-active" : ""}" style="--image: ${reel.image}" aria-label="${reel.author} reel">
          <div class="motion-mark"></div>
        </article>
      `,
    )
    .join("");
}

function renderComments() {
  const reel = reels[state.index];
  commentList.innerHTML = reel.thread
    .map(
      ([initial, text]) => `
        <article class="comment">
          <div class="comment-avatar">${initial}</div>
          <div>
            <strong>@${initial.toLowerCase()}viewer</strong>
            <p>${text}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function updateUi() {
  const reel = reels[state.index];
  document.querySelectorAll(".reel").forEach((node, index) => {
    node.classList.toggle("is-active", index === state.index);
  });
  author.textContent = reel.author;
  avatarInitial.textContent = reel.avatar;
  caption.textContent = reel.caption;
  soundName.textContent = state.muted ? "sound off" : reel.sound;
  likeCount.textContent = formatCount(reel.likes + (state.liked.has(state.index) ? 1 : 0));
  commentCount.textContent = formatCount(reel.comments + reel.thread.length - 3);
  likeBtn.classList.toggle("is-liked", state.liked.has(state.index));
  saveBtn.classList.toggle("is-saved", state.saved.has(state.index));
  followBtn.classList.toggle("is-following", state.following.has(reel.author));
  followBtn.textContent = state.following.has(reel.author) ? "Following" : "Follow";
  soundBtn.style.animationPlayState = state.muted ? "paused" : "running";
  renderComments();
}

function goTo(index) {
  state.index = (index + reels.length) % reels.length;
  updateUi();
}

function burstLike() {
  heartBurst.classList.remove("show");
  void heartBurst.offsetWidth;
  heartBurst.classList.add("show");
}

function openSheet(sheet) {
  sheet.classList.add("is-open");
  sheet.setAttribute("aria-hidden", "false");
}

function closeSheet(sheet) {
  sheet.classList.remove("is-open");
  sheet.setAttribute("aria-hidden", "true");
}

renderFeed();
updateUi();

let startY = 0;
let lastTap = 0;

feed.addEventListener("pointerdown", (event) => {
  startY = event.clientY;
});

feed.addEventListener("pointerup", (event) => {
  const distance = event.clientY - startY;
  const now = Date.now();

  if (Math.abs(distance) > 54) {
    goTo(state.index + (distance < 0 ? 1 : -1));
    return;
  }

  if (now - lastTap < 280) {
    state.liked.add(state.index);
    burstLike();
    updateUi();
  }
  lastTap = now;
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") goTo(state.index + 1);
  if (event.key === "ArrowUp") goTo(state.index - 1);
  if (event.key.toLowerCase() === "l") {
    state.liked.has(state.index) ? state.liked.delete(state.index) : state.liked.add(state.index);
    updateUi();
  }
});

likeBtn.addEventListener("click", () => {
  state.liked.has(state.index) ? state.liked.delete(state.index) : state.liked.add(state.index);
  if (state.liked.has(state.index)) burstLike();
  updateUi();
});

saveBtn.addEventListener("click", () => {
  state.saved.has(state.index) ? state.saved.delete(state.index) : state.saved.add(state.index);
  updateUi();
});

soundBtn.addEventListener("click", () => {
  state.muted = !state.muted;
  updateUi();
});

followBtn.addEventListener("click", () => {
  const reel = reels[state.index];
  state.following.has(reel.author) ? state.following.delete(reel.author) : state.following.add(reel.author);
  updateUi();
});

document.querySelector("#commentBtn").addEventListener("click", () => openSheet(commentSheet));
document.querySelector("#shareBtn").addEventListener("click", () => openSheet(shareSheet));

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => closeSheet(document.querySelector(`#${button.dataset.close}`)));
});

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = commentInput.value.trim();
  if (!text) return;
  reels[state.index].thread.push(["U", text]);
  commentInput.value = "";
  updateUi();
});
