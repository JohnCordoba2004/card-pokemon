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

2. Entra en la carpeta del proyecto:
   cd [NOMBRE_DEL_REPO]

3. Instala las dependencias:
   npm install

4.Inicia el servidor de desarrollo:
   npm run dev

5. Abre tu navegador en http://localhost:5173 (o el puerto que indique la terminal).
  
📸 Captura de Pantalla

<img width="2551" height="1310" alt="image" src="https://github.com/user-attachments/assets/6baba332-6d73-4165-bbf0-00b5880c8f92" />

<img width="1405" height="1131" alt="image" src="https://github.com/user-attachments/assets/3f03bff0-c851-4959-a230-5eb03450b83b" />

🧠 Lo que aprendí construyendo esto
- Consumo de APIs externas con fetch y manejo de estados de carga y error.
- Manipulación avanzada del DOM creando elementos HTML desde TypeScript (document.createElement y innerHTML).
- Uso de la delegación de eventos para manejar elementos creados dinámicamente.
- Aplicación de patrones de diseño como el Debounce (con setTimeout) para optimizar las búsquedas en tiempo real.
- Tipado estricto de respuestas JSON complejas con Interfaces en TypeScript.

Hecho con ❤️ y mucho ganas por John Córdoba.
