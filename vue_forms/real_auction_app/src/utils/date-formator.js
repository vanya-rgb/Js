const formatter = new Intl.DateTimeFormat("ru", {
    weekday: "short", 
    year: "2-digit", 
    month: "long", 
    day: "numeric"})

export function dateFormator(value) {
    console.log("TIME", value);
    console.log(new Date());
    return formatter.format(value)
}