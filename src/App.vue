<template>
  <div id="app">
      <div class="page-container">
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">Polls</span>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary">
            <md-tab id="tab-home" to="/polls" md-label="Polls"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon to="/polls">move_to_inbox</md-icon>
            <span to="/polls" class="md-list-item-text">Polls</span>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content>
        <br>
      <router-view />

        <notifications  position="bottom left" group="auth"/>
      </br>
      </br>
      </md-app-content>
    </md-app>
  </div>
  </div>
</template>

<script>
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";

export default {
  name: 'app',
  data: () => ({
    menuVisible: false,
    isLoading: false,
    fullPage: true
}),
  components: {
    Login,
    Register
  }
}
</script>

<style  scoped>
.md-app {
  max-height: 800px;
  border: 1px solid rgba(#000, 0.12);
}
.md-drawer {
  width: 230px;
}
</style>
