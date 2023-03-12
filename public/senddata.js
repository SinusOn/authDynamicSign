document.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();

  let name = document.querySelector('[name="fname"]');
  let login = document.querySelector('[name="login"]');
  let password = document.querySelector('[name="pass"]');

  let xhr = new XMLHttpRequest();

  xhr.open("POST", "/auth/registration", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Data sended");
    }
  };
  let data = JSON.stringify({
    name: name.value,
    login: login.value,
    password: password.value,
  });
  xhr.upload.onload = function () {
    console.log(`Данные успешно отправлены.`);
  };

  xhr.upload.onloadstart = () => {
    console.log("start load");
  };
  xhr.send(data);
});
