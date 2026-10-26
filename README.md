# 🔴 Pokédex Interactiva 🔴

Una aplicación web moderna y responsiva que consume la [PokéAPI](https://pokeapi.co/) para buscar y visualizar información detallada de tus Pokémon favoritos. 

Este proyecto fue construido desde cero utilizando **TypeScript** para garantizar un código seguro y escalable, manipulando el DOM dinámicamente sin depender de frameworks.

## ✨ Características Principales

*   **Búsqueda en tiempo real:** Encuentra Pokémon por nombre o número de ID mientras escribes (con validación de longitud mínima).
*   **Galería inicial:** Carga automática de los primeros 20 Pokémon al iniciar la aplicación.
*   **Diseño dinámico:** La tarjeta y el modal cambian de color automáticamente según el tipo principal del Pokémon (Fuego, Agua, Planta, etc.).
*   **Modal de detalles:** Visualiza estadísticas base (HP, Ataque, Defensa, etc.) representadas con barras de progreso animadas, además de altura, peso y habilidades.
*   **Manejo de errores:** Alertas visuales amigables si el Pokémon no existe o hay un problema con la red.
*   **Cierre de modal inteligente:** El modal se cierra al hacer clic en la "X" o al hacer clic fuera de la caja de diálogo.
*   **Diseño Responsivo:** Se adapta perfectamente a dispositivos móviles, tablets y pantallas de escritorio.

## 🚀 Tecnologías Utilizadas

*   **[TypeScript](https://www.typescriptlang.org/):** Para un tipado estricto de las respuestas de la API y la manipulación del DOM.
*   **[Vite](https://vitejs.dev/):** Como empaquetador y servidor de desarrollo ultra rápido.
*   **HTML5 & CSS3:** Uso de variables CSS para el sistema de colores dinámicos y `CSS Grid` para la galería. (Diseño base inspirado en una Pokédex clásica).
*   **[PokéAPI](https://pokeapi.co/):** La fuente de datos RESTful.

## 🛠️ Cómo ejecutar el proyecto localmente

Si quieres probar este proyecto en tu máquina, sigue estos pasos:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/JohnCordoba2004/card-pokemon.git
