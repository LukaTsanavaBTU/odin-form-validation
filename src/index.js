import "./styles.css";

const formElement = document.querySelector("form");
const emailFormElement = formElement.querySelector("#email");
const countryFormElement = formElement.querySelector("#country");
const zipFormElement = formElement.querySelector("#zip");
const passwordFormElement = formElement.querySelector("#password");
const repeatFormElement = formElement.querySelector("#repeat-password");
const agreementFormElement = formElement.querySelector("#agreement");

const reportDefaultValidity = function (element) {
  const messageSpan =
    element === agreementFormElement
      ? element.parentElement.nextElementSibling
      : element.nextElementSibling;
  if (!element.checkValidity()) {
    messageSpan.textContent = `* ${element.validationMessage}`;
    element.classList.add("invalid");
  } else {
    element.classList.remove("invalid");
    messageSpan.textContent = "";
  }
};

const reportPasswordValidity = function () {
  const password = passwordFormElement.value;
  if (password.match(/ /)) {
    passwordFormElement.nextElementSibling.textContent =
      "* Spaces are not allowed";
    passwordFormElement.classList.add("invalid");
    passwordFormElement.validity.valid = false;
  } else if (!passwordFormElement.checkValidity()) {
    passwordFormElement.nextElementSibling.textContent = `* ${passwordFormElement.validationMessage}`;
    passwordFormElement.classList.add("invalid");
  } else if (password.match(/[0-9]/) === null) {
    passwordFormElement.nextElementSibling.textContent =
      "* Must include at least one number";
    passwordFormElement.classList.add("invalid");
    passwordFormElement.validity.valid = false;
  } else if (password.match(/[A-Z]/) === null) {
    passwordFormElement.nextElementSibling.textContent =
      "* Must include at least one capital letter";
    passwordFormElement.classList.add("invalid");
    passwordFormElement.validity.valid = false;
  } else if (password.match(/\W/) === null) {
    passwordFormElement.nextElementSibling.textContent =
      "* Must include at least one symbol";
    passwordFormElement.classList.add("invalid");
    passwordFormElement.validity.valid = false;
  } else {
    passwordFormElement.classList.remove("invalid");
    passwordFormElement.nextElementSibling.textContent = "";
    passwordFormElement.validity.valid = true;
  }
};

const reportRepeatValidity = function () {
  if (!repeatFormElement.checkValidity()) {
    repeatFormElement.nextElementSibling.textContent = `* ${repeatFormElement.validationMessage}`;
    repeatFormElement.classList.add("invalid");
  } else if (repeatFormElement.value !== passwordFormElement.value) {
    repeatFormElement.nextElementSibling.textContent = `* Passwords do not match`;
    repeatFormElement.classList.add("invalid");
    passwordFormElement.validity.valid = false;
  } else {
    repeatFormElement.classList.remove("invalid");
    repeatFormElement.nextElementSibling.textContent = "";
    passwordFormElement.validity.valid = true;
  }
};

formElement.addEventListener("submit", (e) => {
  reportPasswordValidity();
  reportRepeatValidity();
  [
    emailFormElement,
    countryFormElement,
    zipFormElement,
    repeatFormElement,
    agreementFormElement,
  ].forEach((element) => {
    reportDefaultValidity(element);
  });

  if (!formElement.checkValidity()) {
    e.preventDefault();
  }
});

[
  emailFormElement,
  countryFormElement,
  zipFormElement,
  repeatFormElement,
  agreementFormElement,
].forEach((element) => {
  element.addEventListener("input", () => {
    reportDefaultValidity(element);
  });
});

passwordFormElement.addEventListener("input", () => {
  reportPasswordValidity();
});

repeatFormElement.addEventListener("input", () => {
  reportRepeatValidity();
});
