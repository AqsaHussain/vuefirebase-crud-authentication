<template>
    <div class="container">
         <button class="btn btn-danger" @click="signout">Logout</button>
        <router-link to="/Meta">Meta</router-link>
        <p>Name: {{name}}</p>
        <form>
            <input type="text" v-model="movie" placeholder="Moive Name"  class="form-control">
           <div>
                <p>Upload an image to Firebase:</p>
                <input type="file" @change="previewImage" accept="image/*" >
            </div>
            <div>
                <p>Progress: {{uploadValue.toFixed()+"%"}}
                <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
            </div>
             <div class="form-group">
            <label for="sel1">Select list (select one):</label>
            <select class="form-control" id="sel1" v-model="status">
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
              
            </select>
             </div>
           
            <input type="submit" class="btn btn-primary" value="Add Movie" @click.prevent="addMovie()"/>
        </form>
        <ul>
            <li v-for="(movieName, key) in movies" :key='key'>
                <h3>{{movieName.name}}</h3>
               
                    <img class="preview" :src="movieName.image_url" height="100" width="100">
                    <br>
                
                <button class="btn btn-primary">Edit</button>
                <input type="text" v-model="editForm[key]" @keyup.enter="editMovie(key)">
                <button class="btn btn-danger" @click="deleteMovie(key)">Delete</button>
            </li>
        </ul>     
  </div>
</template>
<script>
import firebase from 'firebase';
export default {
  name: 'Content',
  data () {
    return {
    name:'',
     movie:'',
     movies:{},
     editForm:[],
      imageData: null,
      picture: null,
      uploadValue: 0,
      uplolader_Id:'',
      status:'',
    }
  },
  beforeCreate(){
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    this.name = user.displayName;
    console.log('user login'+this.name);
  } else {
    // No user is signed in.
    console.log('user is not login');
  }
});
  },
  created(){
    // firebase.database().ref('movies').on('value',(snapshot)=>{
    //   this.movies=snapshot.val();
    // });

    firebase.database().ref('movies').orderByChild("status").equalTo('Active').on('value',(snapshot)=>{
      this.movies=snapshot.val();
    });
    
   
  },
  mounted(){

    

//  var user = firebase.auth().currentUser;
//     if (user != null) {
//     console.log(user);
//     this.name = user.displayName;
//      this.uplolader_Id = user.uid;

//     }
//     else{
//         alert('no name');
//         this.name = 'no name';
//     }
  },
  methods:{
    signout:function(){
        firebase.auth().signOut().then(()=>{
          localStorage.removeItem('token');
            this.$router.replace('/');
        }).catch();

    },

    previewImage(event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
    },

     onUpload(){
      
    },

    addMovie:function(){
        this.picture=null;
        const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.picture =url;
            console.log(url);
            firebase.database().ref('movies').push({
            name:this.movie,
            uploader_id:this.uplolader_Id,
            image_url:this.picture,
            image_name:this.imageData.name,
            status:this.status,
            })
            .then((data) =>{this.movie=''; this.status=''; this.imageData= null,
              this.picture= null,
              this.uploadValue= 0})
            .catch((error) =>{console.log(error)})

            });
        }
        ); 
    },
    editMovie:function(key){
      firebase.database().ref('movies/'+key).set({
        name:this.editForm[key]
      }).then((data)=>{
        this.editForm[key]=null;
      });
    },
    deleteMovie:function(key){
      firebase.database().ref('movies/'+key).remove();
    },
    filePick:function(event){
      this.imageData = event.target.files[0];
      console.log(this.imageData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul{
  list-style: none;
}
li{
  padding: 0 10px;
}
</style>
