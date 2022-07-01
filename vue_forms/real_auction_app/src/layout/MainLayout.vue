<template>
    <div>
        <the-navbar :windowWidth="windowWidth"></the-navbar>
        <div class="container with-nav sidebar-page">
        <app-message></app-message>
        <table class="sc">
            <tr>
            <td class="left-col" id="id">
                <the-sidebar v-if="windowWidth > 900"></the-sidebar>
                <div class="vl"></div>
            </td>
            <td class="right-col">
                <router-view></router-view>
            </td>
            </tr>
        </table>
        </div>
    </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue'
import AppMessage from '../components/ui/AppMessage.vue'
import TheSidebar from '@/components/ui/TheSidebar.vue'

    export default {
        components: {
            TheNavbar, AppMessage, TheSidebar
        },
        data() {
            return { windowWidth: window.innerWidth };
        },
        methods: {
            handleWindowResize(event) { 
                this.windowWidth = event.currentTarget.innerWidth;
                if (this.windowWidth <= 900) {
                    document.getElementById('id').style.display = 'none'
                } else {
                    document.getElementById('id').style.display = ''
                }
            },
        },
        beforeUnmount: function () {
            window.removeEventListener('resize', this. handleWindowResize)
        },
        mounted() {
            window.addEventListener('resize', this.handleWindowResize);
            if (this.windowWidth <= 900) {
                document.getElementById('id').style.display = 'none'
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>