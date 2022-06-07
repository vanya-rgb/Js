<template>
    <div>
        <div>
        <span>{{timer.minutes}}</span>:<span>{{timer.seconds}}</span>
        </div>
        <!-- <p>{{timer.isRunning ? 'Running' : 'Not running'}}</p> -->
        
    </div>
</template>

<script>
    import { onMounted, toRefs, watchEffect, ref } from "vue";
    import { useTimer } from 'vue-timer-hook';
    export default ({
        props: {
            timeInterval: {
                type: Number,
                required: true
            },
        },
        emits: ['timeIsRunning'],
        setup(props, {emit}) {
            const dateCreate = ref()
            const { timeInterval } = toRefs(props)

            localStorage.getItem('time') ? dateCreate.value = localStorage.getItem('time') : dateCreate.value = new Date().toDateString()

            const time = new Date(dateCreate.value)
            time.setSeconds(time.getSeconds() + timeInterval.value);
            const timer = useTimer(time);

            onMounted(() => {
                watchEffect(async () => {
                    if(timer.isExpired.value) {
                        console.warn('IsExpired')
                        localStorage.removeItem('isTooManyAttempts')
                        localStorage.removeItem('time')
                        emit('timeIsRunning')
                    }
                })
            })
            return {
                timer
            };
        },
    });
</script>

<style lang="scss" scoped>

</style>