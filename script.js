const app = document.querySelector(".app");

const url = "http://localhost:3000/users";

const updateUI = (userInfo) => {
  const usersDiv = document.createElement("div");
  usersDiv.classList.toggle("usersDiv");
  for (let i = 0; i < userInfo.length; i++) {
    const user = userInfo[i];
    const userDiv = document.createElement("div");
    userDiv.classList.toggle("userDiv");
    userDiv.innerHTML = `
        <div class="btn-container">
            <div class="user-name">${user.name}</div>
            <div class="btn-box">
                <button type="button" id="${user.email}" class="btn btn-warning" onclick="updateUser(event)" >updateUser</button>
                <button type="button" id="${user.email}" class="btn btn-danger" onclick="deleteUser(event)" >DeleteUser</button>
            </div>
        </div>
    `;
    usersDiv.append(userDiv);
  }
  app.append(usersDiv);
};

// Register User
const registerUser = async () => {
  const userName = document.querySelector("#userName").value;
  const userEmail = document.querySelector("#userEmail").value;
  const userAge = document.querySelector("#userAge").value;
  if (!userName && !userEmail && !userAge) {
    return;
  }
  const newUser = { name: userName, email: userEmail, age: userAge };
  console.log(newUser);
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newUser),
  });
  const data = await response.json();
  document.querySelector("#userName").value = "";
  document.querySelector("#userEmail").value = "";
  document.querySelector("#userAge").value = "";
  app.innerHTML = "";
  updateUI(data);
};

// Deleting User
const deleteUser = async (event) => {
  const userId = event.target.id;
  const selectUserToDelete = { email: userId };
  const response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(selectUserToDelete),
  });
  const data = await response.json();
  app.innerHTML = "";
  updateUI(data);
};

const fetchData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  updateUI(data);
};

fetchData();
