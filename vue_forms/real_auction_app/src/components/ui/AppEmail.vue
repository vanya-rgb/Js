<template>
    <tr class="align-left vertical-align" v-if="isVerify">
        <th>Email:</th>
        <td>{{email}}</td>
        <td>
            <img src="greenMark.png" alt="">
        </td>
    </tr>
    <tr class="align-left vertical-align" v-else>

        <th>Email:</th>
        <td>{{email}}</td>
        <td v-if="!isSend">
            <img src="redMark.png" alt="" @click="sendEmail">
        </td>
        <td class="file-preview" v-else>
            <div class="badge danger cursor">{{currentTime}} сек.</div>
        </td>
    </tr>
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

<style lang="scss" scoped>

</style>