<template>
    <div>
        <td v-if="isVerify">
            <span class="badge primary"><span>Email&nbsp;</span><span>подтвержден</span></span>
        </td>
        <td v-else>
            <div v-if="isSend">Отправить снова через {{currentTime}} сек.</div>
            <div :class="['badge danger cursor', {disabled: isSend}]"
            @click="sendEmail"><strong>Email не подтвержден.</strong><br>
            Кликните, чтобы отправить email c подтверждением</div>
        </td>
    </div>
</template>

<script>

    export default {
        props: ['isVerify'],
        emits: ['verifyEmail'],

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