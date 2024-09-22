const p0 = document.getElementById("p0");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const p4 = document.getElementById("p4");

var db = result[0];

const button_to_rf_db = document.getElementById("button_to_rf_db");

function refreshDB(){
    p0.innerHTML = db;
    // p1.innerHTML = "test2";
    // p2.innerHTML = "test";
    // p3.innerHTML = "test2";
    // p4.innerHTML = "test";
}

button_to_rf_db.addEventListener('click', refreshDB);