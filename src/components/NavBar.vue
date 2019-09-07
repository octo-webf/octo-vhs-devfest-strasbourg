<template>
  <nav>
    <router-link to="/"><img class="minimal-logo" src="../assets/headerLogo.png" alt=""/></router-link>
    <router-link v-if="categoryId" :to="{ name: 'category', params: { categoryId: categoryId } }" class="category-link">{{categoryName}}</router-link>
    <span v-if="false" class="notification-logo" @click="initializeNotifications()">✉</span>
  </nav>
</template>

<script>
// import pushService from '../services/push'
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
      Notification.requestPermission(status => {
        navigator.serviceWorker.ready.then(async function (serviceWorkerRegistration) {
          serviceWorkerRegistration.pushManager.getSubscription()
          await serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true
          }).then(subscription => {
            console.log('User is subscribed:', subscription)
          }).catch(err => {
            if (Notification.permission === 'denied') {
              console.warn('Permission for notifications was denied')
            } else {
              console.error('Failed to subscribe the user: ', err)
            }
          })

          // Do we already have a push message subscription?
          /*
          if (Notification.permission === 'granted') {
            const options = {
              body: 'First notification!',
              icon: 'images/logo.png',
              vibrate: [100, 50, 100],
              data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
              },
              actions: [
                {
                  action: 'explore', title: 'Go to the site',
                  icon: 'images/checkmark.png'
                },
                {
                  action: 'close', title: 'Close the notification',
                  icon: 'images/xmark.png'
                }
              ]
            }
            serviceWorkerRegistration.showNotification('Hello world!', options)
          } */
        })
      })
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
