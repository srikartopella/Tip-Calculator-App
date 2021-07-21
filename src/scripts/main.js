// Selectors
const billInput = document.getElementById("totalAmount");
const btnGroup = document.querySelectorAll(".btn-group");
const customPercent = document.querySelector("#customPercent");
const errMsg = document.querySelector("#error-msg");
const peopleInput = document.querySelector("#noOfPeople");
const tipSpanElement = document.querySelector(".people-amount");
const totalSpanElement = document.querySelector(".person-amount");
const resetBtn = document.querySelector("#resetBtn");

let userData = {
  amount: 0,
  people: 1,
  percent: 0,
};

// Functions
function calculateTip(amount, person, percent) {
  let tip = amount * (percent / 100);
  let totalCost = (tip + amount) / person;

  if (percent == 0) {
    return [amount.toString().slice(0, 3) / person];
  } else {
    return [tip.toString().slice(0, 5), totalCost.toString().slice(0, 10)];
  }
}

function updateContent() {
  let updated = calculateTip(
    userData.amount,
    userData.people,
    userData.percent
  );

  if (updated.length == 2) {
    totalSpanElement.textContent = updated[1];
    tipSpanElement.textContent = updated[0];
  } else {
    totalSpanElement.textContent = updated[0];
  }
}

// Logic

[billInput, peopleInput].forEach((input) => {
  input.addEventListener("click", () => {
    if (input.value) {
      input.select();
    }
  });
});

billInput.addEventListener("blur", () => {
  if (billInput.value) {
    resetBtn.removeAttribute("disabled");
  } else {
    resetBtn.setAttribute("disabled", true);
  }
});

resetBtn.addEventListener("click", () => {
  peopleInput.value = undefined;
  billInput.value = undefined;
  customPercent.value = undefined;
  userData.amount = 0;
  userData.people = 1;
  userData.percent = 0;

  tipSpanElement.textContent = `0.00`;
  totalSpanElement.textContent = `0:00`;
  resetBtn.setAttribute("disabled", true);
});

billInput.addEventListener("input", () => {
  userData.amount = parseFloat(billInput.value);
  updateContent();
});

peopleInput.addEventListener("input", () => {
  if (peopleInput.value == 0) {
    errMsg.classList.remove("hide");
    peopleInput.style.border = `2px solid red`;
  } else {
    errMsg.classList.add("hide");
    peopleInput.style.border = `2px solid var(--lg-cyan2)`;
    userData.people = parseFloat(peopleInput.value);
    updateContent();
  }
});

peopleInput.addEventListener("blur", () => {
  if (peopleInput.value == 0) {
    resetBtn.setAttribute("disabled", true);
  } else {
    resetBtn.removeAttribute("disabled");
  }
});

btnGroup.forEach((btn) => {
  btn.addEventListener("click", () => {
    userData.percent = parseFloat(btn.value);
    updateContent();
  });
});

customPercent.addEventListener("input", () => {
  if (customPercent.value) {
    userData.percent = parseFloat(customPercent.value);
    updateContent();
  } else {
    updateContent();
  }
});
