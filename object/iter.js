var person = {
    name: 'max', 
    age: 29,
    job: 'frontend',
}

// for(var key in person){
//     if (person.hasOwnProperty()){
//         console.log(person[key])
//     }
// }

Object.keys(person).forEach(function(key){
    console.log(person[key])
})
