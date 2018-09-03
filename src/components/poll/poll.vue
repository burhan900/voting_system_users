<template>
  <div >

<b-container class="bv-example-row">
    <h2>Poll Views </h2>
    <br>
    <div v-for="item in polls" >
      <div>

 <b-card title="" :sub-title="item.question">
   <div v-if="!compareTimeStamp(item.expire_timestamp)" >
     <small style="color:red;">This Poll Is Exipred</small>
   </div>
   <div v-else>
     <small>Poll Exipry Date {{converTimeStampToDate(item.expire_timestamp)}}</small>
   </div>
            Poll Id : {{item.id}}

            <div v-if="!compareTimeStamp(item.expire_timestamp)" >
            <b-list-group v-for="option in item.options" >
              <b-list-group-item  >{{option.answer}}</b-list-group-item>
              <b-progress :value="calculatePer(option.votes,item.sum_votes)" :max="100" class="mb-3" animated show-value></b-progress>
        </b-list-group>
</div>
<div v-else-if="item.user_voted != 0">
  <b-list-group v-for="option in item.options" >
    <div v-if="item.user_voted == option.id">
      <b-list-group-item style="color:#8e24aa;">{{option.answer}} | <md-icon>check</md-icon></b-list-group-item>
      <b-progress :value="calculatePer(option.votes,item.sum_votes)" :max="100" class="mb-3" animated show-value></b-progress>
    </div>
    <div v-else>
      <b-list-group-item >{{option.answer}}</b-list-group-item>
      <b-progress :value="calculatePer(option.votes,item.sum_votes)" :max="100" class="mb-3" animated show-value></b-progress>
    </div>
    </b-list-group>
</div >
<div v-else>
  <b-list-group v-for="option in item.options" >

    <b-list-group-item href="#" v-on:click="vote(option.id,item.id)">{{option.answer}}</b-list-group-item>
  </b-list-group>
</div>
    </b-card>

    </div>
    <br>
    </div
    </div>
    <b-pagination align="center" @input="paginationHandler" size="lg" :total-rows="toatalPageCout" v-model="currentPage" :per-page="limit">
    </b-pagination>
   <br>
</b-container>
  </div>

</template>

<script>
import axios from 'axios';
import {api_url,api_auth,getDataUser} from '../../config.js'
import moment from 'moment'
export default {
  limit : 15,
      offset : 0,
      currentPage:1,
      toatalPageCout : 0,
      userData :'',
      polls:{},
  name: "App",

  data() {
    return {
      limit : 15,
      offset : 0,
      currentPage:1,
      toatalPageCout : 0,
      polls:{},
      userData :'',
    };
  },
  methods: {
    converTimeStampToDate(time){
      return moment.unix(time).format("DD/MM/YYYY H:m:s");

    },
    vote(option_id,poll_id){
      let self = this;
      var payload ={
           'poll_id':poll_id,
           'option_id':option_id,
           'user_id':self.userData.id,
      }

      var json_payload = JSON.stringify(payload);
      fetch(api_url+"poll/vote", {
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
                  return false;
             }
            if(data['status'] != undefined && data['status'] == true){
              self.$notify({
                  group: 'auth',
                  title: 'Important message',
                  text: "Voted Sucessfully",
                })
                self.getData()
            }



           });
    },
    calculatePer(votes,sum_votes){
      var cal = 0;
      if(sum_votes != 0){
        cal = ((votes * 100) /  sum_votes);
      }
      return cal;
    },
    compareTimeStamp(timestamp){

        var currentTimestamp =  moment().unix();

        var time = currentTimestamp.toString();

        console.log(time,timestamp);
        if(time < timestamp ){
          return true;
        }
        return false;
    },
    paginationHandler (page){
      let self = this;
      self.offset = (page * self.limit) - self.limit ;
      self.getData();
      self.scrollToTop();
    },
    scrollToTop() {
        window.scrollTo(0,0);
     },
    getData() {
      let self =this;
          fetch(api_url+"poll/?limit="+self.limit+"&offset="+self.offset+"&user_id="+self.userData.id, {
                        method: 'GET',
                        headers: new Headers({

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
                              return;

                      }
                      self.toatalPageCout = data.result.count;
                      self.polls = data.result.data;



                    });
    },

  },
  beforeMount(){
  let self =this;
  self.userData = getDataUser();
  this.getData()
},
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
