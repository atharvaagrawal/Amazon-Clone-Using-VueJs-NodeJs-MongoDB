<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-spacing-top-medium"></div>
                    <h2 class="text-center">Add a new Product</h2>
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
                           <input v-model="title" type="text" class="a-input-text" style="width:100%">
                       </div>

                       <!-- Price -->
                       <div class="a-spacing-top-medium">
                           <label style="margin-bottom:0px;">Price</label>
                           <input v-model="price" type="number" class="a-input-text" style="width:100%">
                       </div>

                       <!-- stockQuantity -->
                       <div class="a-spacing-top-medium">
                           <label style="margin-bottom:0px;">stockQuantity</label>
                           <input v-model="stockQuantity" type="number" class="a-input-text" style="width:100%">
                       </div>

                       <!-- Description -->
                       <div class="a-spacing-top-medium">
                           <label style="margin-bottom:0px;">Description</label>
                            <textarea v-model="description" style="width:100%" name="" id="" cols="30" rows="5" placeholder="details such as a product"></textarea>
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
                                   <span class="a-button-text" @click="onAddProduct">Add Product</span>
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
  async asyncData({ $axios }) {
    try {
        let categories = $axios.$get("http://localhost:3000/api/categories");
        let owners = $axios.$get("http://localhost:3000/api/owners");
        const [catResponse, ownerResponse] = await Promise.all([
            categories,
            owners
        ]);  
        return {
            categories: catResponse.categories,
            owners: ownerResponse.owners,
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
        price: 0,
        description: "",
        stockQuantity: 1,
        selectFile: null,
        fileName: "",
      };
  },
  methods: {
    onFileSelected(event) {
        this.selectFile = event.target.files[0];
        this.fileName = event.target.files[0].name;
    },
    async onAddProduct() {
        let data = new FormData();
        data.append("title", this.title);
        data.append("price", this.price);
        data.append("description", this.description);
        data.append("stockQuantity", this.stockQuantity);
        data.append("ownerID", this.ownerID);
        data.append("categoryID", this.categoryID);
        data.append("photo", this.selectFile, this.selectFile.name);
        let result = await this.$axios.$post(
            "http://localhost:3000/api/products",
            data
        );
          this.$router.push("/");
      }
  }
}
</script>