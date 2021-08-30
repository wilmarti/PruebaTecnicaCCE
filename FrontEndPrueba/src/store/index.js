import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    participante:[
      { nombre:'JOHN WILSON MARTINEZ GUTIERREZ', nota:'5' , curso: '1',nombrecurso:'Enfermedades infecciosas emergentes y reemergentes', tipoid:'CC', nroid:'79908341' },
      { nombre:'Kenneth Martinez', nota:'4' , curso: '1', nombrecurso:'Enfermedades infecciosas emergentes y reemergentes', tipoid:'CC', nroid:'79908342' },
      { nombre:'Kiara Martinez', nota:'5' , curso: '2' ,nombrecurso:'Identificación de hongos Mitospóricos', tipoid:'CC', nroid:'79908343'},
      { nombre:'Jose Martinez', nota:'1' , curso: '1', nombrecurso:'Enfermedades infecciosas emergentes y reemergentes', tipoid:'CC', nroid:'79908344' },
      { nombre:'Carlos Martinez', nota:'2' , curso: '2' , nombrecurso:'Identificación de hongos Mitospóricos', tipoid:'CC', nroid:'79908345'},
      { nombre:'Martha Martinez', nota:'5' , curso: '2', nombrecurso:'Identificación de hongos Mitospóricos', tipoid:'CC', nroid:'79908346' },
      { nombre:'Elias Martinez', nota:'1' , curso: '1' , nombrecurso:'Enfermedades infecciosas emergentes y reemergentes', tipoid:'CC', nroid:'79908347'},
      { nombre:'Mechas Martinez', nota:'2' , curso: '2' , nombrecurso:'Identificación de hongos Mitospóricos', tipoid:'CC', nroid:'79908348'},
      { nombre:'freddy gutierrez', nota:'2' , curso: '4' , nombrecurso:'Microorganismos Anaerobicos', tipoid:'CC', nroid:'79908349'}
    ],

/*     curso: [
      {value: null, text: 'Por favor seleccione el curso a consultar '},
      {text: 'Enfermedades infecciosas emergentes y reemergentes',value: '1'},
      {text: 'Identificación de hongos Mitospóricos',value: '2'},
      {text: 'Identificación y Diagnóstico de Micosis Superficiales',value: '3'},
      {text: 'Microorganismos Anaerobicos',value: '4'},
      {text: 'Genética Humana el Laboratorio Clínico',value: '5'},
      {text: 'Fundamentos de Biología Molecular para el Laboratorio',value: '6'},
      
    ] */


  },
  computed:{
    nombre:''
  },
  mutations: {
    prueba(state,index){     
      this.state.participante[index].nota ++
    },
    filtro:function(){
      this.state.participante.filter(
        item => {
          return index.nota > 2
        }
      )
    },

    
  },
  actions: {
  },
  modules: {
  }
})
