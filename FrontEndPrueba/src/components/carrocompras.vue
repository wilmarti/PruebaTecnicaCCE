<template>

  <div class="mt-0">
    <h5 style="color:#08088A">{{ msg }}</h5>

      <b-container>     

      <br/>

      <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOMBRE DEL PRODUCTO</th>
                                <th>PRECIO</th>
                                <th>STOCK</th>
                                <th>ACCIONES</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pro in cursovirtual" :key="pro.Id">
                                <td>{{pro.Id}}</td>
                                <td>{{pro.ProductName}}</td>
                                <td>{{pro.UnitPrice}}</td>
                                <td>{{pro.UnitsInStock}}</td> 
                                                              
                                <td>
                                  <b-button size="sm" variant="outline-success" v-b-modal.modalEdicion @click="AgregarAlCarro(pro.Id,pro.UnitsInStock,pro.ProductName)">Agregar al carro</b-button>    
                                  <!-- <b-button size="sm" variant="outline-danger" @click="EliminarCurso(pro.Id)" >Retirar del carro</b-button> -->
                                </td>
                            </tr>
                        </tbody>
                    </table>


    <div>


  </div>     




    <div id="modal">
    <b-modal
      id="modalEdicion"
      ref="modal"
      title="Producto para agregar al carro"
      valor= pro.id
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
  Nombre del producto:<h4 class="color=red">{{this.ProductName}}</h4><br/>
   Cantidad de Productos disponibles: <h4>{{this.stock}}</h4>
   <b-alert show variant="danger" v-if="ErrorCantidad == '1'" >Cantidad Invalida</b-alert>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Cantidad de unidades a comprar"   
          label-for="name-input"
          invalid-feedback="Cantidad es requerida"
        >
          <b-form-input
            id="name-input"
            v-model="CantidadComprar"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>


   

      </form>
    </b-modal>
    </div>
        

    </b-container>



  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'  
import axios from 'axios'
import { mdbScrollbar,mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';
import VueScrollingTable from "vue-scrolling-table"


const $ = require('jquery')

export default {
  name: 'carrocompras',
  components: {
      mdbTbl,
      mdbTblHead,
      mdbTblBody,
      mdbScrollbar,
      VueScrollingTable
    },
  data(){
      return {
        Id:null,
        stock:null,
        cursovirtual:null,
        CantidadComprar:0,
        ErrorCantidad: 0,
        


      //caracteristicas del scroll
      scrollVertical: true,
			scrollHorizontal: true,
			syncHeaderScroll: true,
			syncFooterScroll: true,
			includeFooter: true,
			deadAreaColor: "white",
			maxRows: 100,
      freezeFirstColumn: false,
      //
        id:'',
        NuevoCurso:'',
        errors: [],
        name: null,
        age: null,
        movie: null,
        ProductName:null,
        
        nameState: null,
        submittedNames: [],
        IdEdicion: '',
        nameEditar:'',
        nameEditarHoras:'',
        valid:false,
        options: [
          { value: null, text: 'Por favor seleccione una opción' },
          { value: '1', text: 'ACTIVO' },
          { value: '0', text: 'INACTIVO' }
        ],  
        optionsDiploma:[
          { value: null, text: 'Por favor seleccione un diploma' },
          { value: '1', text: 'NORMAL' },
          { value: '2', text: 'HOMIL' },
          { value: '3', text: 'TOMA MUESTRAS DE CITOLOGIA' }
        ],
        SeleccionCursoEstado: null,
        SeleccionDiploma:null,
        SelectEstado:'',
        SelectDiploma:'',
        columns: [
                  { id: "value", title: "ID", cssClasses: "w3" },
                  { id: "text", title: "Nombre del Producto", cssClasses: "w4" },
                  { id: "ESTADO", title: "Precio", cssClasses: "NroId" },
                  { id: "NumeroHoras", title: "Stock", cssClasses: "NroId" },
                  //{ id: "TipoDiploma", title: "Tipo Diploma", cssClasses: "NroId" }
                 ],
        nameHora:null
      }
  },  
  /***************Se ejecuta cuando el componnete se monte */
  mounted(){
      //process.env.ApiUrl= "https://cnbcolombia.com/node/ApiACNB//api/" 
      //console.log("montaje",env.ApiUrl)
      this.getProductos();
  },

   methods:{
    resetModal() {
        this.id = null
     },     

    /*************Methodo que llama la API para llenar array de productos */
    getProductos(){
      axios.get('http://localhost:3000/api/productos/').then (response =>{
        this.cursovirtual = response.data;
      })
      .catch (e => console.log("treendo error",e))
    },


 
    AgregarAlCarro (id,stock,NombreProducto)
    { 
      //console.log("este es el diploma:", diploma)
      //se limpia el formulario modal
      this.resetModal();
        this.Id = id      
        this.stock = stock
        this.ProductName = NombreProducto
        
        console.log("ID",this.Id)      


        if(stock == 0){
          this.SelectEstado = 1
        }else{
          this.SelectEstado = 0
        }

    },

      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.valid = valid
        return valid
      },

      resetModal() {
        //this.CantidadComprar = ''
        this.nameState = null        
      },


      handleOk(bvModalEvt) {
      // se realiza la edicion del curso
      const Operacion = "Restar"
      const Cantidad = this.CantidadComprar
      const UnitsInStock = {Cantidad,Operacion}     


        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
  
        if(this.CantidadComprar <= this.stock && this.CantidadComprar > 0 )
        {
              this.ErrorCantidad = 0
              if (this.valid)
                { 
                  //Llamado al API para realizar la actualizacion de la tabla productos
                  this.CantidadComprar = ''
                              
                              axios.put(`http://localhost:3000/api/productos/${this.Id}`,{UnitsInStock}).then (response =>{
                              if(response.data.ok)
                              {
                                this.ErrorCantidad = 0  
                                      
                                        const IdProducto = this.Id
                                        const IdUsuario = 1
                                        const Cantidad = UnitsInStock.Cantidad 

                                        console.log("esta es la cantidad a comprar:",Cantidad )

                                        const CarroProducto = {IdProducto,IdUsuario, Cantidad};
                                        
                                        //Llamado al API para realizar la insercion al carrito de compras
                                        axios.post('http://localhost:3000/api/productos/carro', CarroProducto)
                                        .then(response => {
                                          console.log("Registro correcto")
                                          //alert("producto registrado con exito.")
                                          this.getProductos();
                                        })
                                        .catch(error => {
                                          // Handle error.  
                                          alert("El producto no pudo ser insertado al carro de compras")
                                          console.log('entro por el error:');
                                        }); 


                                alert("Producto enviado al carrito");
                                this.getProductos(); 

                  
                }else{
                  console.log("error edicion",response)
                  alert("Error al tratar de descontar el producto al carro");
                } 
                })
                .catch (e => console.log("esta errado:",e)) 
              }           
        }
        else{
               this.ErrorCantidad = 1
              this.$nextTick(() => {
              this.$bvModal.show('modalEdicion')
              })
            }


      },


      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
         // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modalEdicion')
        })
      },    

  },
      computed:{
        ValidarInputNumerico(){
          return this.id.text = '' ? false : true
        },
        ...mapState(['participante','curso']),
        listarcurso: function() {
            //return this.participante.filter((item) => item.nota > 4);
            return this.curso.filter((item) => item.value != null);
        },


        },
    props: {
    msg: String
  }
}
</script>

<style>

table.scrolling .w3 {
	width: 4.5em;
	min-width: 4.5em;
	max-width: 4.5em;
  height:2em; 
}
table.scrolling .w4 {
	width: 43em;
	min-width: 43em;
	max-width: 43em;
  height:2em; 
}
table.scrolling .NroId {
	width: 6em;
	min-width: 6em;
	max-width: 6em;
}
table.scrolling .nombres {
	width: 9em;
	min-width: 9em;
	max-width: 9em;
}
table.scrolling .action {
	width: 12em;
	min-width: 12em;
	max-width: 12em;
}


table.scrolling .botones {
column-span: 3;
}
table.scrolling tfoot tr th {
	width: 130em;
	min-width: 130em;
	max-width: 130em;
}
table.freezeFirstColumn thead tr,
table.freezeFirstColumn tbody tr {
	display: block;
	width: min-content;
}
table.freezeFirstColumn thead td:first-child,
table.freezeFirstColumn tbody td:first-child,
table.freezeFirstColumn thead th:first-child,
table.freezeFirstColumn tbody th:first-child {
	position: sticky;
	position: -webkit-sticky;
	left: 0;
}
* {
	font-family: sans-serif;
}
.box {
	clear: both;
	padding: 0;
	min-height: 300px;
	height: 40vh;
  /* width: 100vh; */
	margin-left: auto;
	margin-right: auto;
	overflow: hidden;
}
@font-face {
	font-family: FontAwesome;
	src: url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff);
}
.fa {
	font-family: FontAwesome;
}
</style>


