<template>
  <div class="instructions-container">
    <div class="title-control"> 
      <h2> CONTROL PANEL </h2>
    </div>
    <div class="grid jusify-content-center mt-4">
      <div class="col text-center">
        <Arrow class="arrow arrow-up" @click="add_instruction('F')"></Arrow>
      </div>
    </div>
    <div class="grid jusify-content-around">
      <div class="col text-center">
        <Arrow class="arrow arrow-left" @click="add_instruction('L')"></Arrow>
      </div>
      <div class="col text-center">
        <Arrow class="arrow arrow-right" @click="add_instruction('R')"></Arrow>
      </div>
    </div>
    <div class="flex mt-3">
      <h2> QUEUE </h2> 
    </div>
    <p style="font-size: 10px;"> (max 10)</p>
    <div class="flex mt-5 intructions-letters">
      <p> {{ instructions.join(' - ') }} </p>
    </div>
    <div class="flex mt-5">
      <button class="terminal-button" @click="execute_instrucions"> Execute </button>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Arrow from './Arrow.vue';
import { useStore } from 'vuex'; 

export default defineComponent({
  name: 'Instructions',
  components: {
    Arrow
  },
  setup() {
    // Variables
    const store = useStore()
    const instructions = ref<string[]>([]);

    // Computed
    const direction = computed(() => store.getters.get_direction)

    // Methods
    const add_instruction = (direccion: string) => {
      if (instructions.value.length < 10) {
        instructions.value = [...instructions.value, direccion];
      }
    };

    const execute_instrucions = () => {
      
      for (const key in instructions.value) {
        switch(direction.value) {
          case 'NORTH':
            switch(instructions.value[key]) {
              case 'F':
                store.dispatch('moving', [-1,0])
                break;
              case 'R':
                store.dispatch('change_direction', 'EAST')
                break;
              case 'L':
                store.dispatch('change_direction', 'WEST')
                break;
              default:
                console.log('ERROR')
            }
            break;
          case 'WEST':
            switch(instructions.value[key]) {
              case 'F':
                store.dispatch('moving', [0,-1])
                break;
              case 'R':
                store.dispatch('change_direction', 'NORTH')
                break;
              case 'L':
                store.dispatch('change_direction', 'SOUTH')
                break;
              default:
                console.log('ERROR')
            }
            break;
          case 'EAST':
            switch(instructions.value[key]) {
              case 'F':
                store.dispatch('moving', [0,1])
                break;
              case 'R':
                store.dispatch('change_direction', 'SOUTH')
                break;
              case 'L':
                store.dispatch('change_direction', 'NORTH')
                break;
              default:
                console.log('ERROR')
            }
            break;
          case 'SOUTH':
            switch(instructions.value[key]) {
              case 'F':
                store.dispatch('moving', [1,0])
                break;
              case 'R':
                store.dispatch('change_direction', 'WEST')
                break;
              case 'L':
                store.dispatch('change_direction', 'EAST')
                break;
              default:
                console.log('ERROR')
            }
            break;
          default:
            console.log('ERROR')
        }
      }

      instructions.value = []

    };
  
    return {
      instructions,
      add_instruction,
      execute_instrucions
    };
  }
});
</script>

<style scoped>

.instructions-container {
    font-family: monospace;
    color: #FFFFFF; 
    background-color: #222;
    font-size: 30px;
}

.instructions-container p {
    margin: 0;
}

.title-control {
    font-size: 30px;
}

.arrow {
  background-color: #333;
  color: #fff;
  font-size: 30px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.arrow-up:before {
  content: "\25B2"; /* Código Unicode para la flecha hacia arriba */
}

.arrow-left:before {
  content: "\25C0"; /* Código Unicode para la flecha hacia la izquierda */
}

.arrow-right:before {
  content: "\25B6"; /* Código Unicode para la flecha hacia la derecha */
}

.arrow:hover {
  background-color: #555; /* Cambia el color de fondo al pasar el ratón */
}

.terminal-button {
  background-color: #333; /* Color de fondo similar a la terminal */
  color: #fff; /* Color de texto blanco */
  border: none;
  padding: 10px 20px;
  font-family: monospace; /* Fuente de tipo máquina de escribir */
  cursor: pointer;
  transition: background-color 0.3s ease; /* Transición suave al pasar el ratón */
  font-size: 20px;
}

.terminal-button:hover {
  background-color: #555; /* Cambia el color de fondo al pasar el ratón */
}

.text-instructions {
  font-size: 16px;
}

.intructions-letters {
  font-size: 24px;
}

</style>