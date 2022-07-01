<template>
    <div>
        <ul id="list">
            <li>
                <label title="для обложки">
                    <input type="file" name="photos" accept="image/jpg, image/jpeg, image/png" multiple @change="change">
                    <img :src="compressedData" :class="photoClass">
                </label>
            </li>
            <li>
                <label>
                <input type="file" name="photos" accept="image/jpg, image/jpeg, image/png" multiple>
            </label>
            </li>
            <li>
                <label>
                <input type="file" name="photos" accept="image/jpg, image/jpeg, image/png" multiple>
            </label>
            </li>
        </ul>
    </div>
</template>

<script>
import { reject } from 'lodash'
import {ref} from 'vue'

    export default {
        setup() {
            const photoClass = ref()
            const compressedData = ref()
            const change= (e) => {
                var files = e.target.files
                for(var i = 0, len = files.length; i < len; i++) {
                    var file = files[i]
                    var reader = new FileReader()

                    reader.onload = function (e) {
                        console.log(e);
                        var originalImg = new Image()
                        originalImg.src = e.target.result
                        compressImage(originalImg.src)
                    }
                    reader.readAsDataURL(file)
                }
            }

            const compressImage = (base64) => {
                const canvas= document.createElement('canvas')
                const img = document.createElement('img')

                img.onload = () => {
                    let width = img.width
                    let height = img.height
                    const maxHeight = 900
                    const maxWidth = 1200
                    photoClass.value = 'photoV'

                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height *= maxWidth/width))
                            width = maxWidth
                        }
                        photoClass.value = 'photoH'
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width *= maxHeight / height))
                            height = maxHeight
                        }
                        photoClass.value = 'photoV'
                    }
                    canvas.width = width
                    canvas.height = height

                    const ctx = canvas.getContext('2d')
                    ctx.drawImage(img, 0, 0, width, height)

                    compressedData.value = canvas.toDataURL('image/jpeg', 0.1)
                }
                img.onerror = (err) => {
                    reject(err)
                }
                img.src = base64
            }


            return {
                change, compressedData, photoClass
            }
        }
    }

</script>

<style>
#list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    min-height: 80px;
    padding: 5px;
    background-color: rgb(64, 103, 138);
    list-style: none;
}

li {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    min-height: 70px;
    margin-top: 5px;
    margin-right: 5px;
    border-radius: 3px;
    background-color: #DDD;
    overflow: hidden;
}

li:first-child {
    box-shadow: inset 0 -3px 0 0 #5bab55;
}

label {
    margin: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../public/upload.png');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 30px;
    overflow: hidden;
    cursor: pointer;
}

img {
    z-index: 3;
}

input[name="photos"] {
    height: 0;
    widows: 0;
    margin: 0;
    padding: 0;
    opacity: 0.8;
    font-size: 0px;
    z-index: 2;
}

.photoH {
    max-height: 100%;
}

.photoV {
    max-width: 100%;
}

.photoFit {
    width: 70px;
    height: 70px;
}


</style>