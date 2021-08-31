var garden = Object.create({
    calculateSomething: function() {
        Object.defineProperty(this, 'something',{
            value: 5,
            enumerable: true,
        })
    }
}, {
    location:{
        value:'miass',
        enumerable:true,

    },
    cost:{
        value: 10000,
        enumerable:true,
        writable:true,
    },
    year:{
        value: 2010,
        enumerable:true,
    },
    age:{
        enumerable:true,
        get: function(){
            console.log('set age')
            return new Date().getFullYear() - this.year 
        },
        set: function(){
            console.log('set value')
        }
    }

})
garden.calculateSomething()

for (var key in garden){
    
        console.log(key, garden[key])
    
}