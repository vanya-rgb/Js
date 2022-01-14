export default {
    data() {
      return {
        passportData: null,
        name: null,
        passportDate: null,
      };
    },
  
    computed: {
      // Проверяем, что каждое поле формы валидно
      isFormValid () {
        return Object.keys(this.fields).every(field => this.fields[field].valid);
      },
    },
  };