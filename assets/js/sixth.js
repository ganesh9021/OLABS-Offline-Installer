// Count of objects present in the cardObj array
const countOfObjects = cardObj.length;


function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const obj = document.getElementById("value");
animateValue(obj, 0, countOfObjects, 2000); // Adjust the duration as needed

const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");
// const searchButton = document.getElementById("searchButton");

// Function to render cards based on given array
function renderCards(cardArray) {
  // Clear existing cards
  cardsContainer.innerHTML = "";

  // Render cards
  cardArray.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.className =
      "card mt-5 text-center rounded-4 shadow";
    cardDiv.style.width = "18rem";

    const imgElement = document.createElement("img");
    imgElement.src = card.imgsrc;
    imgElement.className = "card-img-top mt-2";
    imgElement.alt = "...";
    imgElement.style.height = "150px";

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body text-center";

    const cardTextParagraph = document.createElement("p");
    cardTextParagraph.className = "card-text fw-bold text-success";
    cardTextParagraph.textContent = card.cardtitle;

    const startLink = document.createElement("a");
    startLink.href = card.cardhref;
    startLink.target = "_blank";
    startLink.className = "btn btn-danger rounded rounded-pill col-8";
    startLink.style.background = "#B2243F";
    startLink.textContent = "START";

    cardBodyDiv.appendChild(cardTextParagraph);
    cardBodyDiv.appendChild(startLink);

    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(cardBodyDiv);

    cardsContainer.appendChild(cardDiv);
  });
}

function filterCards() {
  const searchText = searchInput.value.trim().toLowerCase();

  if (searchText === "") {
    renderCards(cardObj); // Show all cards if search input is empty
    return;
  }

  const filteredCards = cardObj.filter((card) =>
    card.cardtitle.toLowerCase().includes(searchText)
  );

  if (filteredCards.length === 0) {
    cardsContainer.innerHTML = ""; // Clear existing cards

    // Create and append the error message div
    const errorMessageDiv = document.createElement("div");
    errorMessageDiv.className = "alert alert-danger mt-3 text-center";
    errorMessageDiv.setAttribute("role", "alert");
    errorMessageDiv.textContent = "Lab not found with this name";
    cardsContainer.appendChild(errorMessageDiv);
  } else {
    renderCards(filteredCards); // Show filtered cards
  }
}

// Event listener for search input keyup (for real-time filtering)
searchInput.addEventListener("keyup", filterCards);

// Initially render all cards
renderCards(cardObj);
