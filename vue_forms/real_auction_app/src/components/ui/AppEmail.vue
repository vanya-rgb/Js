<template>
<div>
    <tr class="align-left display" v-if="isVerify">
        <th>Email&nbsp;<img src="greenMark.png" alt=""></th>
        <td>{{email}}</td>
    </tr>
    <tr class="align-left display" v-else>

        <th>Email</th>
        <td class="margin-bottom">{{email}}</td>
        <td v-if="!isSend">
            <!-- <img src="redMark.png" alt="" @click="sendEmail"> -->
            <div class="badge danger cursor localLong"
            @click="sendEmail"
            >Подтвердить Email</div>
        </td>
        <td class="" v-else>
            <div class="badge danger cursor local">{{currentTime}} сек.</div>
        </td>
    </tr>
</div>
</template>

<script>
import { useStore } from "vuex"

    export default {
        props: ['isVerify', 'email'],
        emits: ['verifyEmail'],
        setup(props){
            const store = useStore()

            if (!props.isVerify) {
                store.dispatch('setMessage', {
                    value: 'Нажмите на иконку почты чтобы подтвердить Email',
                    type: 'warning'
                }, {root: true})
            }
        },
        data(){
            return {
                currentTime: 60,
                timer: null,
                isSend: false
            }
            
        },
        methods: {
            sendEmail() {
                this.$emit('verifyEmail')
                this.isSend = true
                this.startTimer()

            },
            startTimer() {
                this.timer = setInterval(() => {
                    this.currentTime--
                }, 1000)
            },
            stopTimer() {
                clearTimeout(this.timer)
            },
        },
        watch: {
            currentTime(time) {
            if (time === 0) {
                this.isSend = false
                this.currentTime = 60
                this.stopTimer()
            }
            }
        },

    }
</script>

<style scoped>
.display {
    display: inline-grid;
}
.localLong {
    width: 150px;
    text-align: center;
}

.local {
    width: 80px;
    text-align: center;
}

.margin-bottom {
    margin-bottom: 5px;
}

</style>