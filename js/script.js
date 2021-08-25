"use strict";

const account = {
  owner: "Petra Poliaková",
  pin: 1111,
  movements: [
    {
      bookISBN: "367476",
      bookName: "Roll With It",
      bookPrice: -11.45,
      orderDates: "2021-01-28T08:17:02.904Z",
    },
    {
      bookISBN: "568469",
      bookName: "Such a Fun Age",
      bookPrice: 5.1,
      orderDates: "2021-04-01T10:17:24.185Z",
    },
    {
      bookISBN: "546467",
      bookName: "Beach Read",
      bookPrice: 22.5,
      orderDates: "2021-05-08T14:11:59.604Z",
    },
    {
      bookISBN: "6897325",
      bookName: "Class Act",
      bookPrice: -35.34,
      orderDates: "2021-05-27T17:01:17.194Z",
    },
    {
      bookISBN: "667884",
      bookName: "Run",
      bookPrice: 24.99,
      orderDates: "2021-07-11T13:36:17.929Z",
    },
    {
      bookISBN: "335844",
      bookName: "Afterparties",
      bookPrice: 17.5,
      orderDates: "2021-08-10T09:42:54.072Z",
    },
  ],
};

const labelWelcome = document.querySelector(".welcome");
const valueSumPaid = document.querySelector(".summary_paid-price");
const valueSumUnpaid = document.querySelector(".summary_unpaid-price");

const containerApp = document.querySelector(".app");
const containerOrders = document.querySelector(".orders");
const loginForm = document.querySelector(".login");
const logOutForm = document.querySelector(".logout");

const btnLogin = document.querySelector(".login_btn");
const btnSort = document.querySelector(".btn-sort");
const btnLogout = document.querySelector(".logout_btn");

const inputLoginUsername = document.querySelector(".login_input-user");
const inputLoginPin = document.querySelector(".login_input-password");

const formatMovementDate = function (date) {
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const displayOrders = function (acc, sort = false) {
  containerOrders.innerHTML = "";
  const ords = sort
    ? acc.slice().sort((a, b) => b.bookPrice - a.bookPrice)
    : acc;
  ords.forEach((movs) => {
    const status = movs.bookPrice > 0 ? "paid" : "unpaid";

    const date = new Date(movs.orderDates);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    const html = `
        <div class="orders_row">
          <div class="orders_number">${movs.bookISBN}</div>
          <div class="orders_name">${movs.bookName}</div>
          <div class="orders_date">${displayDate}</div>
          <div class="orders_price">${movs.bookPrice}€</div>
          <div class="orders_status order_status_${status}">${status}</div>
        </div>
        `;

    containerOrders.insertAdjacentHTML("afterbegin", html);
  });
};
displayOrders(account.movements);

const createUsernames = function (acc) {
  const username = acc.owner
    .toLowerCase()
    .split(" ")
    .map((name) => name[0])
    .join("");
  return username;
};
createUsernames(account);

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  const username = createUsernames(account);
  const password = account.pin;

  if (
    username === inputLoginUsername.value &&
    password === Number(inputLoginPin.value)
  ) {
    labelWelcome.textContent = `Welcome back, ${account.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;
    loginForm.style.display = "none";
    logOutForm.style.display = "flex";
  } else {
    alert("Wrong username or password");
  }
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayOrders(account.movements, !sorted);
  sorted = !sorted;
});

const calcDisplaySummary = function (acc) {
  const movsPrice = acc.map((mov) => mov.bookPrice);
  const paidSummary = movsPrice
    .filter((price) => price > 0)
    .reduce((acc, price) => acc + price, 0);
  valueSumPaid.textContent = `${paidSummary.toFixed(2)}€`;

  const unPaidSummary = movsPrice
    .filter((price) => price < 0)
    .reduce((acc, price) => acc + price, 0);
  valueSumUnpaid.textContent = `${Math.abs(unPaidSummary).toFixed(2)}€`;
};
calcDisplaySummary(account.movements);

btnLogout.addEventListener("click", function (e) {
  e.preventDefault();

  labelWelcome.textContent = `Log in get started`;
  containerApp.style.opacity = 0;
  loginForm.style.display = "flex";
  logOutForm.style.display = "none";
  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur();

  setTimeout(function () {
    if ((sorted = true)) {
      displayOrders(account.movements, !sorted);
    } else {
      sorted = false;
    }
  }, 1000);
});
