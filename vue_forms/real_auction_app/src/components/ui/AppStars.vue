<template>
    <div>
    <div class="review_stars_wrap">
        <div id="review_stars">
            <br>
            <input id="star-5" type="radio" name="stars"
            @click="count = 5"
            />
            <label title="Отлично" for="star-5">
                <font-awesome-icon id="i" icon="fa fa-star" size="2x" />
            </label>
            <input id="star-4" type="radio" name="stars"
            @click="count = 4"
            />
            <label title="Хорошо" for="star-4">
                <font-awesome-icon id="i" icon="fa fa-star" size="2x" />
            </label>
            <input id="star-3" type="radio" name="stars" checked="checked" 
            @click="count = 3"
            />
            <label title="Нормально" for="star-3">
                <font-awesome-icon id="i" icon="fa fa-star" size="2x" />
            </label>
            <input id="star-2" type="radio" name="stars"
            @click="count = 2"
            />
            <label title="Плохо" for="star-2">
                <font-awesome-icon id="i" icon="fa fa-star" size="2x" />
            </label>
            <input id="star-1" type="radio" name="stars"
            @click="count = 1"
            />
            <label title="Ужасно" for="star-1">
                <!-- <i class="fa fa-star"></i> -->
                <font-awesome-icon id="i" icon="fa fa-star" size="2x" />
            </label>
            <input id="star-0" type="radio" name="stars" checked/>
        </div>
        
    </div>
      <!-- <img class="center" :src="iconLink" alt=""> -->
    </div>
</template>

<script>
import {ref, watch} from 'vue'
  export default {
    emits: ['countChanged'],
    setup(_, {emit}) {
        const count = ref(0)
        const mainId = process.env.BASE_URL

        // const list = {
        //   5: `${mainId}goodIcon.png`,
        //   1: `${mainId}badIcon.png`
        // }

        // const iconLink = ref(`${mainId}badIcon.png`)

        // console.log("link", iconLink.value);

        watch(count, (newValue)=> {
            // iconLink.value = list[newValue]
            // console.log("link", list[newValue]);
            console.log('new', newValue);
            emit('countChanged', newValue)
        })


        
        return {
            count, mainId
        }
    },
  }
</script>

<style>
.review_stars_wrap{
  overflow: hidden;
  display: flex;
  justify-content: center;
}
#review_stars {
  overflow: hidden;
  position: relative;
  float: left;
}

#review_stars label {
  margin: 10px;
}

#review_stars input {
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: 0;
}
#review_stars input ~ label #i{
  color:#ccc;
}
#review_stars input:checked ~ label #i{
  color: #ec9801;
}
#review_stars label {
  float: right;
  cursor: pointer;
  position: relative;
  z-index: 1;
}
#review_stars label:hover #i, #review_stars label:hover ~ label #i{
  color: #ec9801;
}
</style>