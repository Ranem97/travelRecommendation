const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const recommendations = [];

function searchBtn() {
  const input = document
    .getElementById("destinationKeyword")
    .value.toLowerCase();

  fetch("travel_recommendation_api.json")
    .then((Response) => Response.json())
    .then((data) => {
      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          if (
            city.name.toLowerCase().includes(input) ||
            city.description.toLowerCase().includes(input)
          ) {
            recommendations.push(city);
          }
        });
      });

      // Search temples
      data.temples.forEach((temple) => {
        if (
          temple.name.toLowerCase().includes(input) ||
          temple.description.toLowerCase().includes(input)
        ) {
          recommendations.push(temple);
        }
      });

      // Search beaches
      data.beaches.forEach((beach) => {
        if (
          beach.name.toLowerCase().includes(input) ||
          beach.description.toLowerCase().includes(input)
        ) {
          recommendations.push(beach);
        }
      });
      console.log(recommendations);
      const resultDiv = document.getElementById("result-card");
      //resultDiv.innerHTML = "";

      recommendations.forEach((recommendation) => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("result-item");
        resultElement.innerHTML = `
      
      <img src="${recommendation.imageUrl}" alt="${recommendation.name}">
      <h3>${recommendation.name}</h3>
      <p>${recommendation.description}</p>
      <button>Visit</button>
    `;
        resultDiv.appendChild(resultElement);
      });
    });
}

btnSearch.addEventListener("click", searchBtn);

function clearBtn() {
  const resultDiv = document.getElementById("result-card");
  const input = document.getElementById("destinationKeyword");
  resultDiv.innerHTML = ``;
  input.value = "";

  recommendations.splice(0, recommendations.length);
  console.log(recommendations);
}
btnClear.addEventListener("click", clearBtn);
