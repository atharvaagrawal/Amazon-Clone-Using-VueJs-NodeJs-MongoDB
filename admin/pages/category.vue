<template>
      <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"> </div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center"> Add a New Category </h2> 
                        <form>
                            <!-- Type  -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;"> Type </label>
                                <input type="text" v-model="type" class="a-input-text" style="width: 100%"/>
                            </div>

                            <!-- Add Category  -->
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onAdCategory"> Add Category </span>
                                    </span>
                                </span>
                            </div>
                        </form>
                        
                        <br/>
                        <ul class="list-group" >
                            <li v-for="category in categories" :key="category._id" class="list-group-item"> {{category.type}} </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </main>
</template>

<script>
export default {
    async asyncData( {$axios}){

        try{
            let categories = $axios.$get('http://localhost:3000/api/categories');
            
            const [catResponse] = await Promise.all([
                categories
            ]); 

            return{
                categories: catResponse.categories 
            };
            
        }catch(err){
            console.log(err);
        }
    },

    data(){
        return{
            type: ""
        }
    },

    methods: {
        async onAdCategory() {
            try{
                let data = { type: this.type };
            
                let response = await this.$axios.$post("http://localhost:3000/api/categories", data);
                
                this.categories.push(data);
            }catch(err) {
                console.log(err);   
            }
            
        }
    }
};  

</script>