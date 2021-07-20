// var person = {
//     age: 28,
//     name:'max',
//     job: 'frontend',
//     displayInfo: function(ms) {

//         setTimeout(function(){
            
//             console.log('name: ', this.name)
//             console.log('job: ', this.job)
//             console.log('age:', this.age)
//         }.bind(this), ms)
        
//     }
// }

// person.displayInfo(500)

function printObject(objName) {
    console.log('printing object', objName)
    for (var key in this) {
        if (this.hasOwnProperty(key)){
            console.log('['+key+']', this[key])
        }
    }
}



var person = {
    firstName:'Max',
    job:'Backend',
    age:29,
    friends: ['Elena', 'Igor']
}

var car = {
    name: 'Ford',
    mpdel: 'Focus',
    age: 2017
}

//1
var printPerson = printObject.bind(person)
printPerson('PERSON')

//2 вызывает нужный нам метод
printObject.call(car, 'CAR')

//3 массив
printObject.apply(person, ['PeRsOn'])


