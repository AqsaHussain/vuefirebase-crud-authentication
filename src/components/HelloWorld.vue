<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">

            <input type="email" v-model="formData.email" class="form-control" placeholder="email">
            <br>
            <input type="password" v-model="formData.password" class="form-control" placeholder="password">
            <br>
            <button class="btn btn-success" @click="signIn">SignIn</button>
            <br><br><br>
            <button class="btn btn-danger" @click="loginwithgoogle">SignIn With Google</button>
            <button class="btn btn-primary" @click="loginwithfacebook">SignIn With Facebook</button>
      </div>
    
   

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
       formData:{
                    email:'',
                    password:''
                },
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    signIn:function(){
      firebase.auth().signInWithEmailAndPassword(this.formData.email, this.formData.password)
      .then((user)=>{
        this.$router.replace('/Content');
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

    },
    loginwithfacebook:function(){
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then((user)=>{
       
        this.$router.replace('/Content');
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        
      });
    },
    loginwithgoogle:function(){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then((user)=>{
        localStorage.setItem("token", JSON.stringify(user.credential.accessToken));
        this.$router.replace('/Content');
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      
      });
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
