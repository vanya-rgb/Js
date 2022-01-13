
const tom = {
    name: "Tom",
    secondName: "Anderson"
}
let txt = ""
for (let x in tom) {
   txt += tom[x] + " "
}

document.getElementById("demo").innerHTML = txt

// The trim() method removes whitespace from both sides of a string:
// text.trim()

//Perform a global, case-insensitive search
//text.match(/ain/gi)

// const fruits = ["Banana", "Orange", "Apple", "Mango"];
//fruits.splice(0, 1);   // Removes the first element
