const createCar = (name, model) => ({name, model})


const ford = createCar('Ford', 'Mustang')
console.log(ford)

const yearField = 'year'

const bmw = {
    name: 'bmw',
    ['model']: 'X6 Sport',
    [yearField]: 2018,

    logFields() {
        const {name, year, model} = this
        console.log(name, model, year )
    }
}

console.log(bmw)
bmw.logFields()

// const year = bmw.year

const {year} = bmw
console.log(year)