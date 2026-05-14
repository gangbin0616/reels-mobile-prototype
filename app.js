const reels = [
  {
    type: "short",
    author: "@brain.signal",
    avatar: "B",
    caption: "숏폼 1개: 도파민 보상은 빠르고, 기억 고정은 느립니다.",
    sound: "fast scroll lab - 01",
    likes: 28400,
    comments: 418,
    metric: 38,
    tag: "빠른 정보",
    image: "linear-gradient(135deg, #0f172a 0%, #155e75 38%, #14b8a6 72%, #f8fafc 100%)",
    thread: [
      ["J", "짧게 보면 다 배운 것 같은 느낌이 문제네요."],
      ["S", "기억에 남는지는 따로 봐야 할 듯."],
      ["N", "인지 부채라는 말이 딱 맞다."],
    ],
  },
  {
    type: "short",
    author: "@focus.debt",
    avatar: "F",
    caption: "60초 지식은 입력 속도가 빠르지만 연결 시간이 부족합니다.",
    sound: "attention debt - loop",
    likes: 91300,
    comments: 1204,
    metric: 61,
    tag: "누적 자극",
    image: "linear-gradient(160deg, #18181b 0%, #3f3f46 25%, #a1a1aa 52%, #fbbf24 73%, #7f1d1d 100%)",
    thread: [
      ["A", "많이 봤는데 설명은 못 하는 그 상태."],
      ["R", "이걸 중간에 끊어주는 장치가 필요함."],
      ["Y", "정리형 콘텐츠로 바꾸는 아이디어 좋다."],
    ],
  },
  {
    type: "short",
    author: "@popcorn.brain",
    avatar: "P",
    caption: "자극 전환이 빨라질수록 느린 글과 긴 과제는 더 무겁게 느껴집니다.",
    sound: "stimulus spike - loop",
    likes: 57200,
    comments: 733,
    metric: 78,
    tag: "제동 필요",
    image: "linear-gradient(130deg, #020617 0%, #1e293b 30%, #be123c 58%, #fda4af 82%, #f8fafc 100%)",
    thread: [
      ["D", "팝콘 브레인 설명용으로 좋다."],
      ["P", "여기서 자동 전환이 나오면 이해될 듯."],
      ["L", "UI가 문제의식을 바로 보여줌."],
    ],
  },
  {
    type: "brake",
    author: "@cognitive.brake",
    avatar: "C",
    caption: "인지 제동장치 작동: 피드 속도를 늦추고 핵심 개념을 재정렬합니다.",
    sound: "low stimulus recovery",
    likes: 12800,
    comments: 96,
    metric: 84,
    tag: "자동 전환",
    image: "linear-gradient(145deg, #042f2e 0%, #0f766e 32%, #d1fae5 60%, #334155 100%)",
    intervention: {
      title: "제동 구간 진입",
      kicker: "Cognitive Brake",
      body: "연속 스크롤 3회 후 자극 피로가 높아졌다고 가정합니다. 다음 콘텐츠는 빠른 재미가 아니라 기억 고정을 돕는 정리형 카드로 전환됩니다.",
      action: "핵심만 10초 정리",
    },
    thread: [
      ["K", "여기서 쉬어가는 게 앱의 차별점이네요."],
      ["B", "실제 측정 대신 추정 모델로 설명하면 안전할 듯."],
      ["H", "멘트가 발표용으로 바로 쓰기 좋다."],
    ],
  },
  {
    type: "knowledge",
    author: "@deep.insert",
    avatar: "D",
    caption: "고밀도 지식 삽입: 단기 기억이 사라지기 전에 구조를 먼저 제공합니다.",
    sound: "knowledge insert - memory",
    likes: 42100,
    comments: 512,
    metric: 46,
    tag: "심화 정보",
    image: "linear-gradient(145deg, #111827 0%, #312e81 26%, #7c3aed 48%, #22d3ee 78%, #ecfeff 100%)",
    knowledge: {
      title: "왜 숏폼 지식은 쉽게 사라질까?",
      points: [
        "작업기억은 한 번에 처리할 수 있는 정보량이 제한적입니다.",
        "장기 기억은 반복, 연결, 회상 과정을 거칠 때 안정됩니다.",
        "따라서 피드 중간에 요약, 질문, 비교를 넣어야 지식이 고정됩니다.",
      ],
      prompt: "방금 본 3개 영상의 공통 키워드: 속도, 자극, 연결 부족",
    },
    thread: [
      ["M", "그냥 쉬는 게 아니라 공부 카드가 들어오는 구조."],
      ["E", "언어/전공/심화 정보 넣기 좋겠다."],
      ["Q", "발표 데모로 이해가 빠름."],
    ],
  },
  {
    type: "quiz",
    author: "@memory.lock",
    avatar: "M",
    caption: "고착화 유도: 망각 시점에 짧은 회상 질문을 띄워 기억을 다시 불러냅니다.",
    sound: "recall cue - lock",
    likes: 33700,
    comments: 281,
    metric: 32,
    tag: "장기 기억",
    image: "linear-gradient(140deg, #020617 0%, #164e63 34%, #0f766e 62%, #f0fdfa 100%)",
    recall: {
      question: "방금 흐름의 핵심 문제는?",
      answer: "정보는 빠르게 들어오지만 연결과 회상 시간이 부족해 휘발성 지식이 된다.",
    },
    thread: [
      ["T", "회상 질문이 들어오니 설명이 남는다."],
      ["G", "이게 숏폼을 학습 도구로 바꾸는 부분이네요."],
      ["U", "마지막에 답 공개되는 연출 좋다."],
    ],
  },
];

const state = {
  index: 0,
  liked: new Set(),
  saved: new Set(),
  muted: false,
  following: new Set(),
  recallOpen: false,
  swipes: 0,
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
const cognitivePanel = document.querySelector("#cognitivePanel");
const cognitiveLabel = document.querySelector("#cognitiveLabel");
const cognitiveMeter = document.querySelector("#cognitiveMeter");
const cognitiveValue = document.querySelector("#cognitiveValue");

function formatCount(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${Math.round(value / 1000)}K`;
  return String(value);
}

function renderFeed() {
  feed.innerHTML = reels.map((reel, index) => renderReel(reel, index)).join("");
}

function renderReel(reel, index) {
  const overlay = reel.intervention
    ? `<section class="insight-card brake-card">
        <span>${reel.intervention.kicker}</span>
        <h2>${reel.intervention.title}</h2>
        <p>${reel.intervention.body}</p>
        <button type="button">${reel.intervention.action}</button>
      </section>`
    : reel.knowledge
      ? `<section class="insight-card knowledge-card">
          <span>Deep Knowledge Insert</span>
          <h2>${reel.knowledge.title}</h2>
          <ul>${reel.knowledge.points.map((point) => `<li>${point}</li>`).join("")}</ul>
          <p class="memory-prompt">${reel.knowledge.prompt}</p>
        </section>`
      : reel.recall
        ? `<section class="insight-card recall-card">
            <span>Recall Lock</span>
            <h2>${reel.recall.question}</h2>
            <p class="recall-answer ${state.recallOpen ? "is-open" : ""}">${state.recallOpen ? reel.recall.answer : "탭하면 답 공개"}</p>
            <button type="button" data-recall>답 보기</button>
          </section>`
        : `<div class="micro-copy">
            <span>${reel.tag}</span>
            <strong>${reel.metric}%</strong>
          </div>`;

  return `
    <article class="reel ${index === state.index ? "is-active" : ""} reel-${reel.type}" style="--image: ${reel.image}" aria-label="${reel.author} reel">
      <div class="motion-mark"></div>
      ${overlay}
    </article>
  `;
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
  cognitiveLabel.textContent = reel.type === "short" ? "자극 누적 추정" : reel.type === "brake" ? "인지 제동 작동" : "기억 고정 구간";
  cognitiveMeter.style.width = `${reel.metric}%`;
  cognitiveValue.textContent = `${reel.metric}%`;
  cognitivePanel.classList.toggle("is-alert", reel.metric >= 75);
  cognitivePanel.classList.toggle("is-lock", reel.type === "knowledge" || reel.type === "quiz");
  renderComments();
}

function goTo(index) {
  state.index = (index + reels.length) % reels.length;
  state.recallOpen = false;
  updateUi();
}

function advance(direction) {
  state.swipes += 1;
  if (direction > 0 && state.swipes === 3) {
    goTo(3);
    return;
  }
  goTo(state.index + direction);
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
    advance(distance < 0 ? 1 : -1);
    return;
  }

  if (event.target.closest("[data-recall]") || event.target.closest(".recall-card")) {
    state.recallOpen = true;
    renderFeed();
    updateUi();
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
  if (event.key === "ArrowDown") advance(1);
  if (event.key === "ArrowUp") advance(-1);
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
