<template>
  <nav>
    <router-link to="/"><img class="minimal-logo" src="../assets/headerLogo.png" alt=""/></router-link>
    <router-link v-if="categoryId" :to="{ name: 'category', params: { categoryId } }" class="category-link">{{categoryName}}</router-link>
    <span v-if="false" class="notification-logo" @click="initializeNotifications()">✉</span>
  </nav>
</template>

<script>
import octotvServices from '../services/octotv'

export default {
  name: 'NavBar',
  computed: {
    categoryId () {
      return this.$route.params && this.$route.params.categoryId
    },
    categoryName () {
      const category = octotvServices.getCategoryInformations(this.categoryId)
      return category && category.name
    }
  },
  methods: {
    initializeNotifications () {
      /* Here will be notification permissions code */
    }
  }
}
</script>

<style scoped>
nav {
  height: 2em;
  text-align: left;
  margin: 5vh 10vw;
}
nav a {
  font-weight: bold;
  font-size: 1.2em;
  color: #e50914;
  text-decoration: none;
  margin-right: 15px;
}
nav a.router-link-exact-active {
  color: white;
}
.notification-logo {
  float: right;
  font-size: 2em;
}
.minimal-logo {
  width: auto;
  height: 1.5em;
}
</style>
