<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"> </div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center"> Add a New Owner </h2> 
                        <form>
                            <!-- Name  -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;"> Name </label>
                                <input type="text" v-model="name" class="a-input-text" style="width: 100%"/>
                            </div>

                            <!-- About  -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;"> About </label>
                                <textarea v-model="about" placeholder="Provide details about yourself." style="width: 100%"></textarea>
                            </div>

                            <!-- Photo  -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;"> Add Photo </label>
                                <div class="a-row a-spacing-top-medium">
                                    <label class="choosefile-button"> 
                                        <i class="fal fa-plus"> </i>
                                        <input type="file"  @change="onFileSelected" />
                                        <p style="margin-top: -70px"> {{ fileName }} </p>
                                    </label>
                                </div>
                            </div>

                            <!-- Product  -->
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onAddOwner"> Add Owner </span>
                                    </span>
                                </span>
                            </div>
                        </form>


                           <ul class="list-group" >
                            <li v-for="owner in owners" :key="owner._id" class="list-group-item"> {{owner.name}} </li>
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
            let owners = $axios.$get('http://localhost:3000/api/owners');

            const [ownerResponse] = await Promise.all([
                owners
            ]); 

            return{
                owners: ownerResponse.owners
            };
            
        }catch(err){
            console.log(err);
        }
    },

    data(){
        return{
            name: null,
            about: null,
            fileName: "",
        }
    },

    methods: {
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
            this.fileName = event.target.files[0].name; 
        },

        async onAddOwner() {
            let data = new FormData();
            data.append("name", this.name);
            data.append("about", this.about);
            data.append("photo", this.selectedFile, this.selectedFile.name);

            let result = await this.$axios.$post("http://localhost:3000/api/owners", data);
            this.owners.push(data);
        }
    }
};  
</script>