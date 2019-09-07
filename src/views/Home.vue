<template>
  <div class="home">
    <router-link v-for="category in categories" :key="category.oid" :to="{ name: 'category', params: { categoryId: category.oid } }" class="category-link">
      <div class="img-wrapper">
        <img :src="getCategoryInformations(category.oid).img" :alt="category.title" class="image-category">
      </div>
      <div class="category-title">{{ category.title }}</div>
    </router-link>
  </div>
</template>

<script>
import octotvServices from '../services/octotv'

export default {
  name: 'home',
  data () {
    return {
      categories: undefined
    }
  },
  methods: {
    getCategoryInformations (oid) {
      return octotvServices.getCategoryInformations(oid)
    }
  },
  async created () {
    this.categories = await octotvServices.getCategories()
  }
}
</script>

<style scoped>
.image-category {
  width: 95%;
}
.category-title {
  text-overflow: ellipsis;
  color: #aaa;
  width: 100%;
  font-size: 0.8em;
  padding: 0.5em 0;
  font-weight: bold;
}

@media (orientation: landscape) {
  .img-wrapper {
    height: 30vh;
    width: 30vh;
  }
}
.img-wrapper {
  height: 20vw;
  width: 20vw;
  max-width: 20vh;
  max-height: 20vh;
  min-width: 80px;
  min-height: 80px;
  text-align: center;
  background-color: rgba(255,255,255,0.2);
  position: relative;
  border: 10px solid rgba(255,255,255,0.2);
  border-radius: 15px;
  margin: 10px;
}
.category-link:focus {
  outline: none
}
.category-link:hover .category-title, .category-link:focus .category-title {
  transition: all 0.5s ease;
  color: white;
  font-size: 1.35em;
  overflow: hidden;
}
.category-link:hover img, .category-link:focus img {
  transition: all 0.5s ease;
  border: 20px solid #00AFCB;
}
.category-link:hover .img-wrapper, .category-link:focus .img-wrapper {
  transition: all 0.5s ease;
  border: 20px solid #00AFCB;
  margin: 0;
  background-color: #00AFCB;
}
img {

  /*
  Allignement vertical et horizontal pour des images de tailles différentes
  */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.category-link {
  vertical-align: top;
  display: inline-block;
  margin: 1em 2vw;
  text-decoration: none;
}
@media only screen and (min-width: 1024px) {
  .category-title {
    font-size: 1.2em;
  }
}
@media only screen and (max-width: 768px) and (orientation: portrait) {
  .img-wrapper {
    height: 80vw;
    width: 80vw;
  }
}

</style>
