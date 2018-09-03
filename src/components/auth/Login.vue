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
          <label>E-mail</label>
          <md-input type="email" v-model="login.email" autofocus v-validate="'required|email'" name="email"></md-input>
        </md-field>
                <div class="alert" v-show="errors.any()">
                    <div v-if="errors.has('email')">
                    {{ errors.first('email') }}
                    </div>
                </div>
        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="login.password" type="password" v-validate="'required'" name="password"></md-input>
        </md-field>
        <div class="alert" v-show="errors.any()">
    <div v-if="errors.has('password')">
      {{ errors.first('password') }}
    </div>
</div>
         <div class="actions md-layout md-alignment-center-space-between">
        <md-button type="submit" class="md-raised md-primary" >Log in</md-button>
      </div>
        </form>
      </div>



      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>
    <router-link :to="{name: 'Register'}">SignUp</router-link>
    </md-content>
    <div class="background" />
  </div>
</template>

<script>
  import axios from 'axios';
  import {api_url,api_auth} from '../../config.js'
export default {
  name: "App",
  data() {
    return {
      loading: false,
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    auth() {
      let self =this;
      self.$validator.validateAll().then((result) => {
          if(result){
               var payload ={
                    'email':self.login.email,
                    'password':self.login.password
               }
               var json_payload = JSON.stringify(payload);
               fetch(api_url+"login", {
                        method: 'POST',
                        body: json_payload,
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': api_auth,
                        })
                    }).then((resp) => resp.json())
                    .then(function(data) {
                        console.log(data);
                      if(data['errors'] != undefined){
                            var errors = data['errors'];
                            if(typeof errors == 'object'){
                                for (var error in errors) {
                                self.$notify({
                                    group: 'auth',
                                    title: 'Important message',
                                    text: errors[error][0],
                                    type: 'error'
                                  })

                              }
                            }else{
                                self.$notify({
                                    group: 'auth',
                                    title: 'Important message',
                                    text: errors,
                                    type: 'error'
                                  })
                            }

                      }
                      if(data['status'] != undefined && data['status'] == true){
                          window.localStorage.setItem('user',JSON.stringify(data['data']))
                          self.$router.push('/poll')
                      }



                    });
          }
      });
    }
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
}
</style>
