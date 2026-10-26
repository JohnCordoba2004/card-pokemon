// ==========================================
// 1. INTERFACES (El contrato de datos)
// ==========================================
interface PokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

// ==========================================
// 2. SELECCIÓN DEL DOM
// ==========================================
const form = document.querySelector("#search-form") as HTMLFormElement;
const input = document.querySelector("#search-input") as HTMLInputElement;
const message = document.querySelector("#message") as HTMLParagraphElement;
const cardContainer = document.querySelector("#card-container") as HTMLElement;
const modal = document.querySelector("#modal") as HTMLDialogElement;
let searchTimeout: number | undefined;
let requestId = 0;

// ==========================================
// 3. FUNCIONES CREADORAS (HTML dinámico)
// ==========================================

// Crea la tarjeta para la galería
function crearCarta(pokemon: PokemonResponse): HTMLElement {
  const article = document.createElement("article");
  article.className = "card";
  article.setAttribute("data-type", pokemon.types[0].type.name);

  const hp = pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat || 0;
  const attack =
    pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat || 0;
  const speed =
    pokemon.stats.find((s) => s.stat.name === "speed")?.base_stat || 0;

  const nombreBonito =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  article.innerHTML = `
    <div class="card-art">
      <div class="card-glow"></div>
      <img class="pokemon-img" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${nombreBonito}" />
    </div>
    <div class="card-info">
      <span class="type-badge">${pokemon.types[0].type.name}</span>
      <h2 class="card-name">
        <span>${nombreBonito}</span>
        <span class="card-number">#${pokemon.id.toString().padStart(3, "0")}</span>
      </h2>
    </div>

    <ul class="card-stats">
      <li><span class="stat-label">HP</span><strong class="stat-value">${hp}</strong></li>
      <li><span class="stat-label">Ataque</span><strong class="stat-value">${attack}</strong></li>
      <li><span class="stat-label">Velocidad</span><strong class="stat-value">${speed}</strong></li>
    </ul>

    <button class="details-btn" type="button" data-id="${pokemon.id}">Ver detalles</button>
  `;
  return article;
}

// Crea y muestra el modal
function abrirModal(pokemon: PokemonResponse): void {
  const mainType = pokemon.types[0].type.name;
  modal.setAttribute("data-type", mainType);

  const getStat = (name: string) =>
    pokemon.stats.find((s) => s.stat.name === name)?.base_stat || 0;
  const getPercent = (val: number) => Math.min((val / 255) * 100, 100);
  const nombreBonito =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  modal.innerHTML = `
    <div class="modal-box">
      <button id="close-modal" class="modal-close" type="button" aria-label="Cerrar">✕</button>

      <div class="modal-head">
        <img class="modal-img" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${nombreBonito}" />
        <div>
          <span class="type-badge">${mainType}</span>
          <h2 class="modal-name">${nombreBonito}</h2>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-box"><span class="stat-label">Altura</span><strong>${pokemon.height / 10} m</strong></div>
        <div class="info-box"><span class="stat-label">Peso</span><strong>${pokemon.weight / 10} kg</strong></div>
      </div>

      <h3 class="section-title">Habilidades</h3>
      <ul class="tags">
        ${pokemon.abilities.map((a) => `<li>${a.ability.name}</li>`).join("")}
      </ul>

      <h3 class="section-title">Estadísticas</h3>
      <ul class="stat-list">
        <li class="stat-row">
          <span>HP</span>
          <div class="bar"><div class="bar-fill" style="width:${getPercent(getStat("hp"))}%"></div></div>
          <span class="stat-num">${getStat("hp")}</span>
        </li>
        <li class="stat-row">
          <span>Ataque</span>
          <div class="bar"><div class="bar-fill" style="width:${getPercent(getStat("attack"))}%"></div></div>
          <span class="stat-num">${getStat("attack")}</span>
        </li>
        <li class="stat-row">
          <span>Defensa</span>
          <div class="bar"><div class="bar-fill" style="width:${getPercent(getStat("defense"))}%"></div></div>
          <span class="stat-num">${getStat("defense")}</span>
        </li>
        <li class="stat-row">
          <span>Ataque esp.</span>
          <div class="bar"><div class="bar-fill" style="width:${getPercent(getStat("special-attack"))}%"></div></div>
          <span class="stat-num">${getStat("special-attack")}</span>
        </li>
        <li class="stat-row">
          <span>Defensa esp.</span>
          <div class="bar"><div class="bar-fill" style="width:${getPercent(getStat("special-defense"))}%"></div></div>
          <span class="stat-num">${getStat("special-defense")}</span>
        </li>
        <li class="stat-row">
          <span>Velocidad</span>
          <div class="bar"><div class="bar-fill" style="width:${getPercent(getStat("speed"))}%"></div></div>
          <span class="stat-num">${getStat("speed")}</span>
        </li>
      </ul>
    </div>
  `;

  modal.showModal();

  // Evento para cerrar el modal
  const closeBtn = document.querySelector("#close-modal");
  closeBtn?.addEventListener("click", () => modal.close());
}

// ==========================================
// 4. EVENTOS PRINCIPALES
// ==========================================

// 1. La función de búsqueda
async function searchPokemons(texto: string) {
  const currentRequest = ++requestId;

  try {
    message.textContent = "Buscando...";
    message.classList.remove("is-error");

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(texto)}`,
    );
    if (currentRequest !== requestId) return;

    if (!response.ok) {
      message.textContent = `No se encontró el Pokémon "${texto}".`;
      message.classList.add("is-error");
      cardContainer.innerHTML = "";
      return;
    }

    const data = (await response.json()) as PokemonResponse;
    if (currentRequest !== requestId) return;

    cardContainer.innerHTML = "";
    cardContainer.appendChild(crearCarta(data));
    message.textContent = "";
  } catch (error) {
    if (currentRequest !== requestId) return;
    message.textContent = "No se pudo conectar con PokéAPI. Inténtalo de nuevo.";
    message.classList.add("is-error");
    console.error("Error al buscar el Pokémon:", error);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  window.clearTimeout(searchTimeout);

  const text = input.value.toLowerCase().trim();
  if (text) {
    searchPokemons(text);
  }
});

input.addEventListener("input", (e) => {
  const text = (e.target as HTMLInputElement).value.toLowerCase().trim();
  window.clearTimeout(searchTimeout);
  requestId += 1;

  if (text.length >= 3) {
    searchTimeout = window.setTimeout(() => searchPokemons(text), 350);
  } else if (text.length === 0) {
    cargarGaleriaInicial();
  } else {
    cardContainer.innerHTML = "";
    message.textContent = "Escribe al menos 3 letras...";
    message.classList.remove("is-error");
  }
});

// Delegación de eventos para abrir el modal
cardContainer.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains("details-btn")) {
    const id = target.getAttribute("data-id");
    if (!id) return;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        message.textContent = "No se pudieron cargar los detalles.";
        message.classList.add("is-error");
        return;
      }
      const data = (await response.json()) as PokemonResponse;

      abrirModal(data);
    } catch (error) {
      message.textContent = "No se pudieron cargar los detalles.";
      message.classList.add("is-error");
      console.error("Error al cargar los detalles del Pokémon:", error);
    }
  }
});

// Cerrar modal haciendo clic fuera de la caja
modal.addEventListener("click", (e) => {
  const rect = modal.getBoundingClientRect();
  const isInDialog =
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;
  if (!isInDialog) {
    modal.close();
  }
});

async function cargarGaleriaInicial() {
  const currentRequest = ++requestId;

  try {
    message.textContent = "Cargando Pokédex...";

    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=21");
    if (!response.ok) {
      throw new Error(`PokéAPI respondió con estado ${response.status}`);
    }
    if (currentRequest !== requestId) return;

    const data = (await response.json()) as {
      results: { url: string }[];
    };

    cardContainer.innerHTML = "";

    for (const pokemonBasico of data.results) {
      const detalleResponse = await fetch(pokemonBasico.url);
      if (!detalleResponse.ok) {
        throw new Error(
          `PokéAPI respondió con estado ${detalleResponse.status}`,
        );
      }
      if (currentRequest !== requestId) return;

      const detalleData = (await detalleResponse.json()) as PokemonResponse;
      cardContainer.appendChild(crearCarta(detalleData));
    }

    message.textContent = "";
  } catch (error) {
    if (currentRequest !== requestId) return;
    message.textContent = "Hubo un error al cargar la galería.";
    message.classList.add("is-error");
    console.error("Error al cargar la galería:", error);
  }
}

// 👇 ¡LA MAGIA! Llamamos a la función para que se ejecute al abrir la página
cargarGaleriaInicial();
