<template>
    <div>
        <div>
        <span>{{timer.hours}}</span>:<span>{{timer.minutes}}</span>:<span>{{timer.seconds}}</span>
        </div>
        <p>{{timer.isRunning ? 'Running' : 'Not running'}}</p>
        
    </div>
</template>

<script>
    import { watchEffect, onMounted, toRefs } from "vue";
    import { useTimer } from 'vue-timer-hook';
    export default ({
        props: {
            dateCreate: {
                type: String,
                required: false,
                default: new Date()
            },
            timeInterval: {
                type: Number,
                required: true
            }
        },
        setup(props) {
            const { dateCreate, timeInterval } = toRefs(props)
            const time = new Date(dateCreate.value)
            time.setSeconds(time.getSeconds() + timeInterval.value);
            const timer = useTimer(time);

            onMounted(() => {
                watchEffect(async () => {
                    if(timer.isExpired.value) {
                    console.warn('IsExpired')
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