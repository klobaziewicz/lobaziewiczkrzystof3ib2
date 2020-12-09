var express = require("express");
var app = express();
const PORT = 3000;
var path = require("path");
var formidable = require('formidable');
var zal = false;

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"));
})

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/register.html"));
    console.log(__dirname);
})

var tab = [
    { login: 'ttt', password: 'ppp', wiek: '18', uczen: 'on', gender: 'm' },
    { login: 'sss', password: 'bbb', wiek: '16', uczen: 'on', gender: 'k' },
    { login: 'www', password: 'hhh', wiek: '11', uczen: 'on', gender: 'm' }
]

app.post("/handleUpload", function (req, res) {
    let form = formidable({});
    form.parse(req, function (err, fields) {
        console.log("----- przesłane pola z formularza ------");
        console.log(fields);
        res.setHeader('content-type', 'application/json');
        tab.push(fields);
        console.log(tab);
        //JSON.stringify(tab, null, 4);
        res.send('Witaj ' + tab[tab.length - 1].login + ' jesteś zarejestrowany!')
    });
});

app.post("/loginowanie", function (req, res) {
    let form = formidable({});
    form.parse(req, function (err, fields2) {
        console.log("----- login i haslo ------");
        console.log(fields2.login);
        console.log(fields2.password);
        res.setHeader('content-type', 'application/json');
        for (var y = 0; y < tab.length; y++) {
            if (fields2.login == tab[y].login && fields2.password == tab[y].password) {
                console.log('udało się');
                zal = true;
                res.redirect("/admin");
            }
        }
    });
});

app.get("/login", function (req, res) {
    zal = false;
    res.sendFile(path.join(__dirname + "/static/login.html"));
    console.log(__dirname);
})

app.get("/admin", function (req, res) {
    if (zal == true) {
        res.sendFile(path.join(__dirname + "/static/zal.html"));
    } else {
        res.sendFile(path.join(__dirname + "/static/admin.html"));
    }
    console.log(__dirname);
})

app.get("/show", function (req, res) {
    //res.send(JSON.stringify(tab, null, 4));
    //res.send('<html><head></head><body><div id="id1"></div><script>for(var i=0;i<' + tab.length + ';i++){console.log('+ tab['i'].login+'")};</script></body></html>');
    res.send('<html><head></head><body><style>td{padding:1vw;border: 1px solid #eee12b; color: white; width:12vw;}.d1{width:6vw;}.d2{width:18vw;}body{background-color: #101056;}a{ margin: 2vh; color: white; }table{margin: 3vh 0;} </style> <a href="http://localhost:3000/sort">sort</a> <a href="http://localhost:3000/gender">gender</a> <a href="http://localhost:3000/show">show</a> <table class="table"></table> <script>var tab=' + JSON.stringify(tab, null, 4) + ';for (var i = 0; i < tab.length; i++){ var tr = document.createElement("tr"); document.querySelector(".table").append(tr); var td1 = document.createElement("td");td1.classList.add("d1"); td1.textContent = "id: " + (i + 1); tr.append(td1); var td2 = document.createElement("td");td2.classList.add("d2");td2.textContent = "user: " +  tab[i].login  + " - " +  tab[i].password; tr.append(td2); var td3 = document.createElement("td"); if (tab[i].uczen == "on") { td3.textContent = "uczen: tak"} else { td3.textContent = "uczen: nie" }; tr.append(td3); var td4 = document.createElement("td"); td4.textContent = "wiek: " +  tab[i].wiek; tr.append(td4); var td5 = document.createElement("td"); td5.textContent = "plec: " +  tab[i].gender; tr.append(td5); }; </script> </body> </html>')
    console.log(__dirname);
})

app.get("/gender", function (req, res) {
    res.send('<html><head></head><body><style>td{padding:1vw;border: 1px solid #eee12b; color: white; width: 10vw;}body{background-color: #101056;}a{ margin: 2vh; color: white; }table{margin: 3vh 0;} </style> <a href="http://localhost:3000/sort">sort</a> <a href="http://localhost:3000/gender">gender</a> <a href="http://localhost:3000/show">show</a> <table class="table1"></table><table class="table2"></table> <script>var tab=' + JSON.stringify(tab, null, 4) + ';var tr1 = document.createElement("tr"); document.querySelector(".table1").append(tr1);var tr2 = document.createElement("tr"); document.querySelector(".table2").append(tr2);for (var i = 0; i < tab.length; i++){if(tab[i].gender=="k"){var tr = document.createElement("tr"); document.querySelector(".table1").append(tr); var td1 = document.createElement("td"); td1.textContent = "id: " + (i + 1); tr.append(td1);var td2 = document.createElement("td"); td2.textContent = "plec: k"; tr.append(td2);}else{var tr = document.createElement("tr"); document.querySelector(".table2").append(tr); var td1 = document.createElement("td"); td1.textContent = "id: " + (i + 1); tr.append(td1);var td2 = document.createElement("td"); td2.textContent = "plec: m"; tr.append(td2);}}; </script> </body> </html>')
    console.log(__dirname);
})

var rosn;

app.post("/radio", function (req, res) {
    let form = formidable({});
    form.parse(req, function (err, fields3) {
        res.setHeader('content-type', 'application/json');
        if (fields3.ros == 'r') {
            rosn = true;
            res.redirect("/sort");
        } else {
            rosn = false;
            res.redirect("/sort");
        }
    });
});

app.post("/radio1", function (req, res) {
    let form = formidable({});
    form.parse(req, function (err, fields4) {
        res.setHeader('content-type', 'application/json');
        if (fields4.ros == 'r') {
            rosn = true;
            res.redirect("/sort");
        } else {
            rosn = false;
            res.redirect("/sort");
        }
    });
});

app.post("/radio2", function (req, res) {
    let form = formidable({});
    form.parse(req, function (err, fields5) {
        res.setHeader('content-type', 'application/json');
        if (fields5.ros == 'r') {
            rosn = true;
            res.redirect("/sort");
        } else {
            rosn = false;
            res.redirect("/sort");
        }
    });
});

app.get("/sort", function (req, res) {
    if (rosn == true) {
        res.send('<html><head></head><body><style>td{padding:1vw;border: 1px solid red; color: white; width: 13vw;}.d1{width:6vw;}body{background-color: #101056;}a{ margin: 2vh; color: white; }table{margin: 3vh 0;}label{color:white;} </style> <a href="http://localhost:3000/sort">sort</a> <a href="http://localhost:3000/gender">gender</a> <a href="http://localhost:3000/show">show</a><form onchange="this.submit()" enctype="application/x-wwwform-urlencoded" method="POST" action="/radio1"/><input type="radio" name="mal" value="m"><label>malejaco</label><input type="radio" name="ros" value="r" checked><label>rosnaco</label></form><table class="table"></table><script>var tabl=' + JSON.stringify(tab, null, 4) + ';var tab=[]for(let u=0;u<tabl.length;u++){for(let o=0;o<tabl.length;o++){}};for (var i = 0; i < tab.length; i++){ var tr = document.createElement("tr"); document.querySelector(".table").append(tr); var td1 = document.createElement("td");td1.classList.add("d1"); td1.textContent = "id: " + (i + 1); tr.append(td1); var td2 = document.createElement("td"); td2.textContent = "user: " +  tab[i].login  + " - " +  tab[i].password; tr.append(td2);var td4 = document.createElement("td"); td4.textContent = "wiek: " +  tab[i].wiek; tr.append(td4);};</script> </body> </html>');
    } else if (rosn == false) {
        res.send('<html><head></head><body><style>td{padding:1vw;border: 1px solid green; color: white; width: 13vw;}.d1{width:6vw;}body{background-color: #101056;}a{ margin: 2vh; color: white; }table{margin: 3vh 0;}label{color:white;} </style> <a href="http://localhost:3000/sort">sort</a> <a href="http://localhost:3000/gender">gender</a> <a href="http://localhost:3000/show">show</a><form onchange="this.submit()" enctype="application/x-wwwform-urlencoded" method="POST" action="/radio2"/><input type="radio" name="mal" value="m" checked><label>malejaco</label><input type="radio" name="ros" value="r"><label>rosnaco</label></form><table class="table"></table><script>var tab=' + JSON.stringify(tab, null, 4) + ';for (var i = 0; i < tab.length; i++){ var tr = document.createElement("tr"); document.querySelector(".table").append(tr); var td1 = document.createElement("td");td1.classList.add("d1"); td1.textContent = "id: " + (i + 1); tr.append(td1); var td2 = document.createElement("td"); td2.textContent = "user: " +  tab[i].login  + " - " +  tab[i].password; tr.append(td2);var td4 = document.createElement("td"); td4.textContent = "wiek: " +  tab[i].wiek; tr.append(td4);};</script> </body> </html>');
    } else {
        res.send('<html><head></head><body><style>td{padding:1vw;border: 1px solid #eee12b; color: white; width: 13vw;}.d1{width:6vw;}body{background-color: #101056;}a{ margin: 2vh; color: white; }table{margin: 3vh 0;}label{color:white;} </style> <a href="http://localhost:3000/sort">sort</a> <a href="http://localhost:3000/gender">gender</a> <a href="http://localhost:3000/show">show</a><form onchange="this.submit()" enctype="application/x-wwwform-urlencoded" method="POST" action="/radio"/><input type="radio" value="m" name="mal"><label>malejaco</label><input type="radio"  value="r" name="ros"><label>rosnaco</label></form><table class="table"></table><script>var tab=' + JSON.stringify(tab, null, 4) + ';for (var i = 0; i < tab.length; i++){ var tr = document.createElement("tr"); document.querySelector(".table").append(tr); var td1 = document.createElement("td");td1.classList.add("d1"); td1.textContent = "id: " + (i + 1); tr.append(td1); var td2 = document.createElement("td"); td2.textContent = "user: " +  tab[i].login  + " - " +  tab[i].password; tr.append(td2);var td4 = document.createElement("td"); td4.textContent = "wiek: " +  tab[i].wiek; tr.append(td4);};</script> </body> </html>');
    }
    console.log(__dirname);
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})