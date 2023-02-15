const url = "http://localhost:3000/users";

const fetchData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
};

fetchData();
