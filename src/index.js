// const routes = {
//   "/": {
//     linkLabel: "Home",
//     content: `I am in home page`,
//   },
//   "/about": {
//     linkLabel: "About",
//     content: `I am in about page`,
//   },
//   "/friends": {
//     linkLabel: "Friends",
//     path: "snake.html", // Pfade zu den anderen HTML-Dateien
//   },
// };

// function loadContent(path) {
//   fetch(path)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.text();
//     })
//     .then((data) => {
//       const contentElement = document.getElementById("content");
//       contentElement.innerHTML = data;
//     })
//     .catch((error) => {
//       console.error("There was a problem fetching the content:", error);
//     });
// }

// function renderContent() {
//   const path = window.location.pathname; // Aktuelle URL-Pfad

//   const route = routes[path]; // Überprüfe, ob der Pfad in den definierten Routen existiert
//   if (route) {
//     if (route.path) {
//       loadContent(route.path); // Wenn ein Pfad angegeben ist, lade den Inhalt der entsprechenden Seite
//     } else {
//       const contentElement = document.getElementById("content");
//       contentElement.innerHTML = route.content; // Andernfalls verwende den statischen Inhalt aus der Routendefinition
//     }
//   } else {
//     // Hier kannst du eine Fallback-Seite anzeigen, wenn die Route nicht gefunden wurde
//     console.log("Route not found");
//   }
// }

// // Event-Listener, der bei jeder Änderung der URL aufgerufen wird
// window.addEventListener("popstate", renderContent);

// // Rufe die renderContent-Funktion einmal auf, um den Inhalt basierend auf der aktuellen URL zu rendern
// renderContent();
