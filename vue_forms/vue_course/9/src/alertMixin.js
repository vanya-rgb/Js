export default {
    
        data() {
            return {
                alert: false,
                text: 'Very important message! Watch out!',
                title: 'Attention!',
            }
        },
        methods: {
            toggleAlert() {
                this.alert = !this.alert
            }
        }
    
}