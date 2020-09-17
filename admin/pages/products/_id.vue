<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-spacing-top-medium"></div>
                    <h2 class="text-center">Update {{ product.title }}</h2>
                     <form action="">
                        <!-- Category Dropdown -->
                        <div class="a-spacing-top-medium">
                           <label>Category</label> 
                           <select v-model="categoryID" class="a-select-option">
                               <!-- <option value="" selected disabled>Select a Category</option> -->
                               <option v-for="category in categories" :key="category._id" :value="category._id">
                                   {{ category.type }}
                               </option>
                           </select>
                        </div>
                        <!-- Author Dropdown -->
                        <div class="a-spacing-top-medium">
                           <label>Author</label> 
                           <select v-model="ownerID" class="a-select-option">
                               <!-- <option value="" selected disabled>Select an Author</option> -->
                               <option v-for="owner in owners" :key="owner._id" :value="owner._id">
                                   {{ owner.name }}
                               </option>
                           </select>
                        </div>

                        <!-- Title -->
                       <div class="a-spacing-top-medium">
                           <label style="margin-bottom:0px;">Title</label>
                           <input v-model="title" :placeholder="product.title" type="text" class="a-input-text" style="width:100%">
                       </div>

                       <!-- Price -->
                       <div class="a-spacing-top-medium">
                           <label style="margin-bottom:0px;">Price</label>
                           <input v-model="price" :placeholder="product.price" type="number" class="a-input-text" style="width:100%">
                       </div>

                       <!-- stockQuantity -->
                       <div class="a-spacing-top-medium">
                           <label style="margin-bottom:0px;">stockQuantity</label>
                           <input v-model="stockQuantity" :placeholder="product.stockQuantity" type="number" class="a-input-text" style="width:100%">
                       </div>

                       <!-- Description -->
                       <div class="a-spacing-top-medium">
                           <label style="margin-bottom:0px;">Description</label>
                            <textarea v-model="description" style="width:100%" id="" cols="30" rows="5" :placeholder="product.description"></textarea>
                       </div>

                         <!-- Photo -->
                       <div class="a-spacing-top-medium">
                           <label style="margin-bottom:0px;">Add Photo</label>
                           <div class="a-row a-spacing-top-medium">
                               <label class="choosefile-button">
                                   <i class="fal fa-plus"></i>
                                   <input type="file" @change="onFileSelected" />
                                   <p style="margin-top:-70px">{{ fileName }}</p>
                               </label>
                           </div>
                       </div>

                       <hr/>
                         <!-- Button Submit -->
                       <div class="a-spacing-top-large">
                           <span class="a-button-register">
                               <span class="a-button-inner">
                                   <span class="a-button-text" @click="onUpdateProduct">Update Product</span>
                               </span>
                           </span>
                       </div>
                    </form>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    // Get Data From categories & owners
  async asyncData({ $axios, params }) {
    try {
        let categories = $axios.$get("http://localhost:3000/api/categories");
        let owners = $axios.$get("http://localhost:3000/api/owners"); 
        let product = $axios.$get(`http://localhost:3000/api/products/${params.id}`);
        const [catResponse, ownerResponse, productResponse] = await Promise.all([
            categories,
            owners,
            product
        ]);  
        return {
            categories: catResponse.categories,
            owners: ownerResponse.owners,
            product: productResponse.product,
        }
    } catch (err) {
        console.log(err);
    }
  },
  data() {
      return{
        categoryID: null,
        ownerID: null,
        title: "",
        price: "",
        description: "",
        stockQuantity: "",
        selectFile: null,
        fileName: "",
      };
  },
  methods: {
    onFileSelected(event) {
        this.selectFile = event.target.files[0];
        this.fileName = event.target.files[0].name;
    },
    async onUpdateProduct() {
        let data = new FormData();
        data.append("title", this.title);
        data.append("price", this.price);
        data.append("description", this.description);
        data.append("stockQuantity", this.stockQuantity);
        data.append("ownerID", this.ownerID);
        data.append("categoryID", this.categoryID);
        data.append("photo", this.selectFile, this.selectFile.name);
        let result = await this.$axios.$put(`http://localhost:3000/api/products/${this.$route.params.id}`,
            data
        );
        this.$router.push("/");
      }
  }
}
</script>