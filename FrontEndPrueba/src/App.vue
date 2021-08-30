<template>

  <div id="app">

    <b-navbar toggleable="md" type="dark" variant="dark">
    
          <b-container >
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-navbar-brand >Prueba Tecnica - CCF</b-navbar-brand>
            
            <b-collapse is-nav id="nav-collapse" >
                <b-navbar-nav>

                  <b-nav-item-dropdown text="Tienda" right>
                    <b-dropdown-item :to="{name:'Home'}" exact>Productos</b-dropdown-item>
                    <!-- <b-dropdown-item :to="{name:'Participante'}">Participantes</b-dropdown-item> -->
                    <b-dropdown-item  :to="{name:'producto'}">Carro de Compras</b-dropdown-item>
                  <!--   <b-dropdown-item  :to="{name:'prueba'}">Prueba</b-dropdown-item> -->
                  </b-nav-item-dropdown>


                  <b-nav-item-dropdown text="Funcionario" right>
                    <b-dropdown-item :to="{name:'login'}">Ingresar</b-dropdown-item>
                    <b-dropdown-item  :to="{name:'cerrar'}">Cerrar sesión</b-dropdown-item>
                  </b-nav-item-dropdown>


                </b-navbar-nav>    
            </b-collapse>
          </b-container>


    </b-navbar>

   <b-container>
     <router-view/>
   </b-container>
  

  </div>
</template>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
