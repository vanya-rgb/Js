var person = {
    age: 28,
    name:'max',
    job:'frontend',
    displayInfo: function(ms) {
        setTimeout(function(){
            console.log('Name', this.name)
            console.log('Job', this.job)
            console.log('Age', this.age)
        }.bind(this),ms)
        
    }
}

person.displayInfo(500)