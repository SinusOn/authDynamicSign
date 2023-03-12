document.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();

  let firstName = document.querySelector('[name="fname"]');
  let lastName = document.querySelector('[name="lname"]');

  let xhr = new XMLHttpRequest();

  xhr.open("POST", "/registration", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Data sended");
    }
  };
  let data = JSON.stringify({
    firstName: firstName.value,
    lastName: lastName.value,
  });
  xhr.send(data);
});
