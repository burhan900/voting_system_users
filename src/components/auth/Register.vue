<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <img src="https://vuematerial.io/assets/logo-color.png">
        <div class="md-title">Voting System</div>
      </div>

      <div class="form">
        <form novalidate class="md-layout" @submit.prevent="auth">
        <md-field>
          <label>User Name</label>
          <md-input v-model="login.user_name" autofocus v-validate="'required|min:5'" name="username"></md-input>
        </md-field>
<div class="alert" v-show="errors.any()">
    <div v-if="errors.has('username')">
      {{ errors.first('username') }}
    </div>
</div>
        <md-field md-has-password>
          <label>Email</label>
          <md-input v-model="login.email" type="email" v-validate="'required|email'" name="email"></md-input>
        </md-field>
<div class="alert" v-show="errors.any()">
    <div v-if="errors.has('email')">
      {{ errors.first('email') }}
    </div>
</div>
        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="login.password" type="password"  v-validate="'required'" name="password" ></md-input>
        </md-field>
        
<div class="alert" v-show="errors.any()">
    <div v-if="errors.has('password')">
      {{ errors.first('password') }}
    </div>
</div>
        <md-field md-has-password>
          <label>Confirm Password</label>
          <md-input v-model="login.confirm_password" type="password"  v-validate="{required: true, is: login.password}" name="password_confirmation" ></md-input>
        </md-field>
         <div class="alert" v-show="errors.any()">
          <div v-if="errors.has('password_confirmation')">
                {{ errors.first('password_confirmation') }}
              </div>
         </div>
            
        </form>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        
        <md-button type="submit" class="md-raised md-primary " @click="auth">Log in</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import axios from 'axios';
import {api_url,api_auth} from '../../config.js'
export default {
  name: "App",
  login:{},
  data() {
    return {
      loading: false,
      login: {
        user_name:"",
        email: "",
        password: "",
        confirm_password:"",
      }
    };
  },
  methods: {
    auth() {
      let self =this;
  
      self.$validator.validateAll().then((result) => {
        if (result) {
          // prepare payload
          var payload ={
            'name':self.login.user_name,
            'email':self.login.email,
            'password':self.login.password
          }
          var json_payload = JSON.stringify(payload);

          fetch(api_url+"register-user", {
                        method: 'POST',
                        body: json_payload,
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': api_auth,
                        })
                    }).then((resp) => resp.json())
                    .then(function(data) {
                      if(data['errors'] != undefined){
                            var errors = data['errors'];
                              for (var error in errors) {
                                self.$notify({
                                    group: 'auth',
                                    title: 'Important message',
                                    text: errors[error][0],
                                    type: 'error'
                                  })
                                
                              }
                      }
                      
                     
                            
                    });
          
        } 
      })
    },
  }
};
</script>

<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .alert {
    background: #fdf2ce;
    font-weight: bold;
    display: inline-block;
    padding: 5px;
    margin-top: -20px;
  }
  .alert-in-enter-active {
    animation: bounce-in .5s;
  }
  .alert-in-leave-active {
    animation: bounce-in .5s reverse;
  }
}
</style>
