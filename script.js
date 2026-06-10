const fragments = [
  "“Que estas palavras sejam o cata-vento a girar a sua lembrança.”",
  "“O tempo, disfarçado de mestre, me ensinou que a distância não se mede em quilômetros, mas em abraços que esperam.”",
  "“A saudade é um vidro fechado: não tem vento, mas tem pressão.”",
  "“O tempo não foi embora, apenas mudou de casa.”",
  "“Ninguém pode prender o tempo nem o traço do vento.”",
  "“A poesia, não é o descanso, mas a continuidade da viagem.”",
  "“A vida é um cata-vento girando dentro da gente.”",
  "“O tempo voa como o vento de leste, não pede, só leva.”"
];

const fragmentButton = document.getElementById("fragmentButton");
const fragmentText = document.getElementById("fragmentText");
const flyingWords = document.getElementById("flyingWords");
const scrollProgress = document.getElementById("scrollProgress");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const windField = document.querySelector(".wind-field");

let currentFragment = 0;

function createFlyingWords(text) {
  if (!flyingWords) return;

  flyingWords.innerHTML = "";

  const cleanText = text.replace(/[“”.,]/g, "");
  const words = cleanText.split(" ").filter(Boolean);

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.classList.add("fly-word");
    span.textContent = word;

    const startX = 18 + Math.random() * 55;
    const startY = 32 + Math.random() * 30;
    const moveX = 180 + Math.random() * 420;
    const moveY = -120 + Math.random() * 240;
    const rotate = -40 + Math.random() * 80;
    const delay = index * 35;

    span.style.setProperty("--start-x", `${startX}%`);
    span.style.setProperty("--start-y", `${startY}%`);
    span.style.setProperty("--move-x", `${moveX}px`);
    span.style.setProperty("--move-y", `${moveY}px`);
    span.style.setProperty("--rotate", `${rotate}deg`);
    span.style.animationDelay = `${delay}ms`;

    flyingWords.appendChild(span);
  });

  setTimeout(() => {
    flyingWords.innerHTML = "";
  }, 1900);
}

function createWindGust() {
  if (!windField) return;

  windField.classList.add("gust");

  for (let i = 0; i < 22; i++) {
    const leaf = document.createElement("span");
    leaf.classList.add("gust-leaf");

    const top = 8 + Math.random() * 82;
    const delay = Math.random() * 450;
    const size = 14 + Math.random() * 18;
    const gustY = -160 + Math.random() * 320;
    const rotate = 180 + Math.random() * 520;

    leaf.style.top = `${top}vh`;
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size * 0.65}px`;
    leaf.style.animationDelay = `${delay}ms`;
    leaf.style.setProperty("--gust-y", `${gustY}px`);
    leaf.style.setProperty("--gust-rotate", `${rotate}deg`);

    document.body.appendChild(leaf);

    setTimeout(() => {
      leaf.remove();
    }, 3200);
  }

  setTimeout(() => {
    windField.classList.remove("gust");
  }, 2800);
}

if (fragmentButton && fragmentText) {
  fragmentButton.addEventListener("click", () => {
    createFlyingWords(fragmentText.textContent);
    createWindGust();

    fragmentText.classList.add("changing");

    setTimeout(() => {
      currentFragment = (currentFragment + 1) % fragments.length;
      fragmentText.textContent = fragments[currentFragment];
      fragmentText.classList.remove("changing");
    }, 420);
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

function updateScrollProgress() {
  if (!scrollProgress) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);