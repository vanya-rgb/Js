<template>
  <header class="navbar">
    Composition API
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Главная страница</router-link>
      </li>
      <li>
        <router-link to="/reusable">Переиспользование</router-link>
      </li>
      <li>
        <router-link to="/vuex">Vuex</router-link>
      </li>
    </ul>
  </header>
  <div class="container with-nav">
    <router-view></router-view>
  </div>

</template>

<script>

</script>