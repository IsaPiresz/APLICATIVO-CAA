



// ===== COMUNICAÇÃO ALTERNATIVA =====
const frases = [
    { emoji: "🍎", texto: "Quero maçã" },
    { emoji: "🚽", texto: "Quero ir ao banheiro" },
    { emoji: "💧", texto: "Quero água" },
    { emoji: "😀", texto: "Estou feliz" },
    { emoji: "😢", texto: "Estou triste" },
  ];
  
  const painel = document.getElementById("painel");
  
  function renderPainel() {
    painel.innerHTML = "";
    frases.forEach((item) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<span>${item.emoji}</span><small>${item.texto}</small>`;
      div.onclick = () => falar(item.texto);
      painel.appendChild(div);
    });
  }
  
  function falar(texto) {
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = "pt-BR";
    speechSynthesis.speak(voz);
  }
  
  document.getElementById("addFrase").addEventListener("click", () => {
    const emoji = prompt("Digite um emoji:");
    const texto = prompt("Digite o texto da frase:");
    if (emoji && texto) {
      frases.push({ emoji, texto });
      renderPainel();
    }
  });
  
  renderPainel();
  
  // ===== JOGO DE ASSOCIAÇÃO =====
  const jogoArea = document.getElementById("jogoArea");
  const scoreSpan = document.querySelector("#score span");
  let score = 0;
  let cartas = [];
  let cartaVirada = null;
  
  function iniciarJogo() {
    const simbolos = ["🍎", "🚗", "🐶", "🌞", "⭐", "⚽"];
    cartas = [...simbolos, ...simbolos]
      .sort(() => 0.5 - Math.random())
      .map((simbolo, i) => ({ id: i, simbolo, virada: false }));
  
    renderJogo();
  }
  
  function renderJogo() {
    jogoArea.innerHTML = "";
    cartas.forEach((carta) => {
      const div = document.createElement("div");
      div.className = "carta";
      div.textContent = carta.virada ? carta.simbolo : "❓";
      div.onclick = () => virarCarta(carta.id);
      jogoArea.appendChild(div);
    });
  }
  
  function virarCarta(id) {
    const carta = cartas.find((c) => c.id === id);
    if (carta.virada) return;
    carta.virada = true;
    renderJogo();
  
    if (!cartaVirada) {
      cartaVirada = carta;
    } else {
      if (carta.simbolo === cartaVirada.simbolo) {
        score += 10;
        falar("Parabéns!");
        cartaVirada = null;
      } else {
        setTimeout(() => {
          carta.virada = false;
          cartaVirada.virada = false;
          cartaVirada = null;
          renderJogo();
        }, 800);
      }
      scoreSpan.textContent = score;
    }
  }
  
  document.getElementById("novoJogo").addEventListener("click", iniciarJogo);
  iniciarJogo();
  






