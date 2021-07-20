var person = {
    name: 'Max',
    age: '26',
    job:'front',
    friends:['elena', 'igor'],
    car:{
        model:'ford'
    },
}

var str = JSON.stringify(person)
console.log(str)

console.log(JSON.parse(str))


var date = new Date()