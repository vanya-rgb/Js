
// function getAge(year){
//     const currrent = new Date().getFullYear()
//     return currrent - year
// }



// const calculateAge = (year) => {
//     const currrent = new Date().getFullYear()
//     return currrent - year
// }

// const getAge = year => {
//     const currrent = new Date().getFullYear()
//     return currrent - year
// }

// const getAge = year => new Date().getFullYear() - year

// const logAge = year => console.log(new Date().getFullYear() - year)

// logAge(12)
// console.log(getAge(1945))

const person = {
    age:25,
    firstName:'maksim',
    logNameWithTimeout() {
        setTimeout(() =>{
         console.log(this.firstName)   
        }, 1000)
    }
}