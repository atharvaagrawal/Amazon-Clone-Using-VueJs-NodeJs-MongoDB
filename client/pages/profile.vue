 <template>
      <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"> </div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center"> Profile Page </h2> 
                        <a href="#" @click="onLogout"> Logout </a>
                        <form>
                            <!-- Name  -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;"> Name </label>
                                <input type="text" v-model="name" class="a-input-text" style="width: 100%" :placeholder="$auth.$state.user.name"/>
                            </div>

                            <!-- Email  -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;"> Email </label>
                                <input type="text" v-model="email" class="a-input-text" style="width: 100%" :placeholder="$auth.$state.user.email"/>
                            </div>

                            <!-- Password  -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;"> Password </label>
                                <input type="text" v-model="password" class="a-input-text" style="width: 100%"/>
                            </div>

                            <!-- Button  -->
                            <hr/>
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onUpdateProfile"> Update Profile </span>
                                    </span>
                                </span>
                            </div>
                        </form>
                        
                        <br/>
                       
                    </div>
                </div>
            </div>
        </div>
      </main>
</template>

<script>
export default {
    data(){
        return{
            name: "",
            email: "",
            password: ""
        }
    },
    methods: {
        async onUpdateProfile(){
            try{
                 let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                 }

                 let response =  await this.$axios.$put("/api/auth/user", data);
 
                 console.log(response); 

                 if(response.success){
                    this.name = "";
                    this.email = "";
                    this.password = "";

                    await this.$auth.fetchUser();

                 }
             }catch(err){
                 console.log(err);
             }
        },

        async onLogout(){
             await this.$auth.logout();
        }
    }

};  

</script>