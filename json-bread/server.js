// const ejs = require('ejs');
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const readData = () => JSON.parse(fs.readFileSync('data.json', 'utf8'));
// const writeData = (data) => fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf8');

// app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));



const express = require("express");
const path = require("path");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf8"));
const writeData = (data) => fs.writeFileSync("data.json", JSON.stringify(data, null, 3));

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views")); // specify the views directory
app.set("view engine", "ejs");

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {data: data});
});
app.get("/add", (req, res) => {
  res.render("add");
});
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  // console.log(...data[id]);
  res.render("edit", {item: {...data[id]}, id});
  
});

app.post("/add", (req, res) => {
  const {id, string, integer, float, date, boolean} = req.body;
  data.push({
    id: id,
    string: string,
    integer: integer,
    float: float,
    date: date,
    boolean: boolean
  });
  writeData(data);
  res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
  const {id, string, integer, float, date, boolean} = req.body;
  const index = req.params.id;
  let overWrite = {
    id: id,
    string: string,
    integer: integer,
    float: float,
    date: date,
    boolean: boolean
  };
  data.splice(index, 1, overWrite)
  writeData(data);
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  data.splice(id, 1)
  writeData(data);
  res.redirect("/");
})

app.listen(3000, () => {
  console.log(`web ini berjalan di port 3000!`);
});