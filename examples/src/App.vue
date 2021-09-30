<template>
  <div class="container">
    <h1 class="title">Next Datatable Demo</h1>
    <div class="form">
      <div>
        <input id="inputClientMode" v-model="mode" type="radio" name="mode" value="Client">
        <label for="inputClientMode">Client Mode</label>
      </div>
      <div>
        <input id="inputServerMode" v-model="mode" type="radio" name="mode" value="Server">
        <label for="inputServerMode">Server Mode</label>
      </div>
    </div>
    <hr>
    <component :is="mode" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Client from './components/Client.vue'
import Server from './components/Server.vue'

export default {
  components: {
    Client,
    Server
  },
  setup() {
    const mode = ref('Client')

    return {
      mode
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
  .title {
    font-size: 1.75rem;
  }

  .form {
    margin-top: 2rem;
  }

  .container {
    width: min(100%, 720px);
    margin: 0 auto;
    font-family: 'Noto Sans JP', sans-serif;
    margin-top: 1rem;
  }

  .action {
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;
    padding-bottom: .5rem;
    width: 100%;;
    border-bottom: 1px solid rgb(190, 190, 190);
  }
</style>