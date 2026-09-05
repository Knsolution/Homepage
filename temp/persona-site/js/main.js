// Lucide 아이콘 path 데이터 (stroke 기반, 24x24 viewBox)
const ICONS = {
  briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
  mapPin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  graduationCap: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
};

function icon(name) {
  const inner = ICONS[name];
  if (!inner) return "";
  return `<svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

// 기본 정보 항목의 한글 key -> 아이콘 매핑. data.js에 새 key를 추가하면 여기도 맞춰준다.
const BASIC_INFO_ICONS = {
  직업: "briefcase",
  소속: "building",
  성별: "user",
  MBTI: "sparkles",
  거주지: "mapPin",
  학력: "graduationCap",
};

function renderKeyValueList(container, obj) {
  container.innerHTML = "";
  for (const [key, value] of Object.entries(obj)) {
    const dt = document.createElement("dt");
    dt.innerHTML = `${icon(BASIC_INFO_ICONS[key])}<span>${key}</span>`;
    const dd = document.createElement("dd");
    dd.textContent = value;
    container.append(dt, dd);
  }
}

function renderTags(container, items) {
  container.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    container.append(li);
  }
}

function renderCareer(container, career) {
  container.innerHTML = "";
  if (career.length === 0) {
    container.closest("section").hidden = true;
    return;
  }
  for (const job of career) {
    const card = document.createElement("div");
    card.className = "career-card";
    card.innerHTML = `
      <h3>${job.title} · ${job.company}</h3>
      <p class="career-period">${job.period}</p>
      ${job.description ? `<p class="career-note">${job.description}</p>` : ""}
    `;
    container.append(card);
  }
}

function renderGallery(container, images) {
  container.innerHTML = "";
  if (images.length === 0) {
    container.closest("section").hidden = true;
    return;
  }
  for (const img of images) {
    const figure = document.createElement("figure");
    figure.innerHTML = `
      <img src="${img.src}" alt="${img.caption}" loading="lazy" />
      <figcaption>${img.caption}</figcaption>
    `;
    container.append(figure);
  }
}

function render(persona) {
  document.title = `${persona.name} · 프로필`;

  document.getElementById("hero-name").textContent = persona.name;
  document.getElementById("hero-tagline").textContent = persona.tagline;
  const photo = document.getElementById("hero-photo");
  photo.src = persona.photo;
  photo.alt = persona.name;
  photo.onerror = () => {
    photo.replaceWith(Object.assign(document.createElement("div"), {
      className: "hero-photo-placeholder",
      textContent: persona.name.charAt(0),
    }));
  };

  renderKeyValueList(document.getElementById("basic-info-list"), persona.basicInfo);

  const appearanceSection = document.getElementById("section-appearance");
  if (!persona.appearance.description && persona.appearance.특징.length === 0) {
    appearanceSection.hidden = true;
  } else {
    document.getElementById("appearance-description").textContent =
      persona.appearance.description;
    renderTags(document.getElementById("appearance-features"), persona.appearance.특징);
  }

  renderTags(document.getElementById("personality-traits"), persona.personality.traits);
  renderTags(document.getElementById("personality-likes"), persona.personality.likes);
  renderTags(document.getElementById("personality-dislikes"), persona.personality.dislikes);

  document.getElementById("background-text").textContent = persona.background;

  renderCareer(document.getElementById("career-list"), persona.career);

  const goalsSection = document.getElementById("section-goals");
  if (persona.goals.length === 0) {
    goalsSection.hidden = true;
  } else {
    renderTags(document.getElementById("goals-list"), persona.goals);
  }

  renderGallery(document.getElementById("gallery-grid"), persona.gallery);
}

render(persona);
