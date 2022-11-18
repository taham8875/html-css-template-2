let dataLists = document.querySelectorAll("datalist");
let convertButton = document.querySelector(`.currency .box form button`);
let countryFrom = document.querySelector(`input[list="country-from"] `);
let countryTo = document.querySelector(`input[list="country-to"] `);
let valueFrom = document.querySelector(`input[list="value-from"] `);
let valueTo = document.querySelector(`input[list="value-to"] `);
fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
  )
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    displayCurencies(data);
  });

function displayCurencies(data) {
  for (const currency in data) {
    dataLists[0].innerHTML += `<option value="${currency} - ${data[currency]}">`;
    dataLists[1].innerHTML += `<option value="${currency} - ${data[currency]}">`;
  }
}

convertButton.addEventListener("click", function(event) {
  event.preventDefault();
  fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${
      countryFrom.value.split(" ", 1)[0]
    }/${countryTo.value.split(" ", 1)[0]}.json`
    )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      valueTo.value = valueFrom.value * Object.entries(data)[1][1];
      valueTo.style.color = "initial";
      if (valueTo.value === "NaN") {
        valueTo.value = "invalid";
        valueTo.style.color = "red";
      }
    })
    .catch((error) => {
      valueTo.value = "invalid";
      valueTo.style.color = "red";
    });
});