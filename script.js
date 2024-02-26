const showAmeal = document.getElementById("btn");
const BodyCarrier = document.getElementById("DownPhse");
const Footer = document.getElementById("footer");
const MainPage = document.querySelector(".container");
const welcomAlert = document.querySelector(".welcomePOP");
const ShowRandom = document.getElementById("showRandom");
const ShowSearch = document.getElementById("showSearch");
const EntireSearch = document.querySelector(".search-cont");
const EntireSeeMeal = document.querySelector(".SeeAmeal");
const searchInput = document.getElementById("search");
const searchBtn = document.querySelector(".fa-magnifying-glass");

let clickCount = 0;

const dishAmeal = (meal) => {
  const newInnerHTML = `
    <section>
      <div class="index-img">
        <img src="${meal.strMealThumb}" alt="" id="img-self">
      </div>
      <div class="Description-cont">
        <div class="Description-hold">
          <div class="chief-them">
            ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
          </div>
        </div>
        ${meal.strYoutube ? `
        <div class="videoHolder">
          <h5 style="text-align:center">Learn How to cook this Meal</h5>
          <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"></iframe>
        </div> ` : ''}
        <div class="instruction-cont">
          <div class="instruction-hold">
            <h4>${meal.strMeal}</h4>
            <p>${meal.strInstructions}</p>
          </div>
        </div>
      </div>
    </section>
  `;
  
  BodyCarrier.innerHTML = newInnerHTML;
  Footer.style.display = "block";
};

showAmeal.addEventListener("click", () => {
  clickCount++;

  if (clickCount === 5) {
    alert("Oya the Go... TanQ😂😂😂");
  }

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => dishAmeal(res.meals[0]));
});

searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.meals) {
          dishAmeal(res.meals[0]);
        } else {
          BodyCarrier.innerHTML = "<p>No meal found. Please try again.</p>";
        }
      });
  }
});

class Typewriter {
  constructor(
    elementId,
    text,
    delay = 100,
    spaceClass = "space",
    letterClass = "letter"
  ) {
    const element = document.getElementById(elementId);
    this.counter = 0;

    const displayText = () => {
      if (this.counter >= text.length) {
        setTimeout(displayText, 2000);
        return;
      }

      if (text[this.counter] === " ") {
        const space = document.createElement("span");
        space.className = spaceClass;
        element.appendChild(space);
      } else {
        const letter = document.createElement("span");
        letter.className = letterClass;
        letter.textContent = text[this.counter];
        element.appendChild(letter);
      }

      this.counter++;
      setTimeout(displayText, delay);
    };

    this.start = () => {
      element.innerHTML = "";
      displayText();
    };
  }
}

const question = new Typewriter("Qtn", "Feed Your Eyes!!");
question.start();
ShowRandom.addEventListener("click", (event) => {
  event.preventDefault();
  MainPage.style.display = "block";
  welcomAlert.style.display = "none";
  EntireSearch.style.display = "none";
  const message = new Typewriter(
    "Stn",
    "View A Random Food By Clicking the Button Below 😊😊😊",
    100,
    "space",
    "letter"
  );
  message.start();
});
ShowSearch.addEventListener("click", (event) => {
  event.preventDefault();
  MainPage.style.display = "block";
  welcomAlert.style.display = "none";
  EntireSeeMeal.style.display = "none";
  const message = new Typewriter(
    "Stn",
    "View A Random Food By Searching for it Below 😊😊😊",
    100,
    "space",
    "letter"
  );
  message.start();
});

