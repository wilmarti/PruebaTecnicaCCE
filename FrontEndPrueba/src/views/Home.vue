<template>
  
  <div class="home">

<!--       <div v-if="userLogged" class="mt-5">
            <cursovirtual  msg="PRODUCTOS DE LA TIENDA CCE"/>          
      </div>
      
      <div v-else>
        <br/>
        <login/>
      </div>  -->

      <div  class="mt-5">
            <carrocompras  msg="PRODUCTOS DE LA TIENDA CCE"/>          
      </div>      
         
  </div>

</template>

<script>
// @ is an alias to /src
import carrocompras from '@/components/carrocompras.vue'
import login from '@/views/Login.vue'
import auth from "@/auth";

export default {
  name: 'Home',
  components: {
    carrocompras,
    login    
  },
  views:{
      login
  },
  computed: {
    userLogged() {
      return auth.getUserLogged();
    }
  }
}
</script>
