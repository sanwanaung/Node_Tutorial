const http = require("http");
const fs = require("fs");
const port = 3000;

let users = [
  { name: "Rose's Fav Boi", email: "rosefavboi@gmail.com", age: 20 },
  { name: "San Wan Aung", email: "sanwanaung@gmail.com", age: 21 },
  { name: "Zaw Mun Aung", email: "zawmunaung@gmail.com", age: 22 },
  { name: "Aung Aung", email: "aungaung@gmail.com", age: 23 },
];

const server = http.createServer((req, res) => {
  const method = req.method;
  const route = req.url;
  const isRootUrl = route === "/";

  if (isRootUrl) {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (route === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      return res.end();
    });
  } else if (route === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      return res.end();
    });
  } else if (route === "/users") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
      return res.end();
    } else if (method === "POST") {
      let newData = "";
      req.on("data", (chunk) => {
        newData += chunk;
      });
      req.on("end", () => {
        const changeJsToObj = JSON.parse(newData);
        users.push(changeJsToObj);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        return res.end();
      });
    } else if (method === "DELETE") {
      let newData = "";
      req.on("data", (chunk) => {
        newData += chunk;
      });
      req.on("end", () => {
        const changeJsToObj = JSON.parse(newData);
        const checEmail = changeJsToObj.email;
        let filterUser = users.filter((user) => {
          return user.email !== checEmail;
        });
        users = filterUser;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        return res.end();
      });
    }
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Not Home Url");
    return res.end();
  }
});

server.listen(port, () => {
  console.log(`Server Started: Listening on port ${port}`);
});
