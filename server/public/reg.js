import { coordinates as coord } from "./script.js";
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".regis").addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.querySelector('[name="fname"]');
    const login = document.querySelector('[name="login"]');
    const password = coord.join(" ");
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/auth/registration", true);
    xhr.setRequestHeader("Content-type", "application/json");

    const data2 = JSON.stringify({
      name: name.value,
      login: login.value,
      password: password,
    });
    xhr.upload.onload = function () {
      console.log(`Данные успешно отправлены.`);
    };

    xhr.upload.onloadstart = () => {
      console.log("start load");
    };

    xhr.send(data2);
  });
});
