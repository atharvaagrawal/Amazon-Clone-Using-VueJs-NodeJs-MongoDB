<template>
  <main>
    <div class="a-spacing-large"> </div>

    <div class="container-fluid browsing-history">
      <div class="row">
        <div class="col-sm-8 col-8">
          <h1 class="a-size-large a-spacing-none a-text-normal"> All Products </h1>
          <div class="a-spacing-large"> </div>
          <!-- Button -->
          <nuxt-link to="/products" class="a-button-buy-again"> Add a new Product </nuxt-link>
          <nuxt-link to="/category" class="a-button-history margin-right-10"> Add a new Category </nuxt-link>
          <nuxt-link to="/owner" class="a-button-history margin-right-10"> Add a new Owner </nuxt-link>
        </div>
      </div>
    </div>

    <div class="a-spacing-large"> </div>

    <!-- Listing Page -->
    <div class="container-fluid browsing-history">
      <div class="row">
        <div v-for="(product, index) in products" :key="product._id" class="col-xl-2 col-lg-2 col-md-3 col-sm-6 br bb">
          <div class="history-box">
            <!-- Product Image -->
            <a href="#" class="a-link-normal">
              <img :src="product.photo" class="img-fluid" />
            </a>
            <!-- Product Title -->
            <div class="a-spacing-top-base asin-title">
              <span class="a-text-normal">
                <div class="p13n-sc-truncated">{{ product.title }} </div>
              </span>
            </div>
            <!-- Product Rating -->
            <div class="a-row">
              <!-- Star Ratings -->
              <no-ssr>
                <star-rating :rating="product.averageRating" :show-rating="false" :glow="1" :border-width="1"
                  :rounded-corners="true" :read-only="true" :star-size="18"
                  :star-points="[12,2,14,17,0,19,10,34,7,50,23,43,38,50,36,34,46,19,31,17]"></star-rating>
              </no-ssr>
            </div>

            <!-- Product Price -->
            <div class="a-row">
              <span class="a-size-base a-color-price">
                <span class="p13n-sc-price"> ₹{{product.price}} </span>
              </span>
            </div>

            <!-- Product Buttons -->
            <div class="a-row">
              <nuxt-link :to="`/products/${product._id}`" class="a-button-history margin-right-10"> Update </nuxt-link>
              <a class="a-button-history margin-right-10" @click="onDeleteProduct(product._id,index)"> Delete </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import StarRating from "vue-star-rating";
  export default {
    components: {
      StarRating
    },
    // asyncDAta is fetching data before nuxt page finished loading on the browser
    // It is good for SEO because the data will be loaded first
    async asyncData({
      $axios
    }) {
      try {
        let response = await $axios.$get("http://localhost:3000/api/products");
        return {
          products: response.products
        }

      } catch (err) {
        console.log(err);
      }

    },
    methods: {
      async onDeleteProduct(id, index) {
        try {
          let response = await this.$axios.$delete(`http://localhost:3000/api/products/${id}`);

          this.products.splice(index, 1);

        } catch (err) {
          console.log(err);
        }
      }

    }

  };

</script>

<style>

</style>
