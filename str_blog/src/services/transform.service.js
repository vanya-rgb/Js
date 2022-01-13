export class TransformService {
    static fbObjectToArray(fbData) {
        //пробег по всем ключам, вызврат массива
        return Object.keys(fbData).map(key => {
            //вытищил данные по ключу
            const item = fbData[key]
            //добавления поля key
            item.id = key
            return item
        })
    }
}