import { coordinates as coord } from "./script.js";
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".auth").addEventListener("click", (e) => {
    e.preventDefault();
    // const name = document.querySelector('[name="fname"]');
    // const login = document.querySelector('[name="login"]');
    // const password = coord.join(" ");
    // const xhr2 = new XMLHttpRequest();

    // xhr2.open("POST", "/auth/login", true);
    // xhr2.setRequestHeader("Content-type", "application/json");

    // const data = JSON.stringify({
    //   name: name.value,
    //   login: login.value,
    //   password: password,
    // });
    // xhr2.upload.onload = function () {
    //   console.log(`Данные успешно отправлены.`);
    // };

    // xhr2.upload.onloadstart = () => {
    //   console.log("start load");
    // };
    // xhr2.send(data);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "auth/test");
    xhr.setRequestHeader("Content-type", "application/json");
    const name = document.querySelector('[name="fname"]');
    const login = document.querySelector('[name="login"]');
    const password = coord.join(" ");
    const data = {
      name: name.value,
      login: login.value,
      password: password,
    };
    // const data = {
    //   name: "name.value",
    //   login: "dd",
    //   password: "password",
    // };
    const g = JSON.stringify(data);
    xhr.send(g);
    console.log("f");
  });
});
