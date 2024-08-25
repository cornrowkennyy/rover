<template>
  <div class="terminal">
    <div class="flex flex-row flex-wrap p-5">
      <div class="typewriter">
        <p id="typed-text"></p>
      </div>
    </div>
    <div class="flex flex-row flex-wrap p-5">
      <RouterLink to="/board"> 
        <button class="terminal-button" v-if="typing_finished"> Start </button> 
      </RouterLink>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'
import Typed from 'typed.js';

// Data

const typing_finished = ref(false);

// On Mounted

onMounted(() => {
  new Typed('#typed-text', {
    strings: [
      "The Mars exploration mission has begun. On board a state-of-the-art spacecraft, an autonomous rover awaits its turn to descend to the surface of the Red Planet. Its mission: to explore, collect data, and perhaps even discover signs of past or present life. Get ready to explore this new planet!"
    ],
    typeSpeed: 10,
    backSpeed: 0,
    smartBackspace: false,
    loop: false,
    showCursor: false,
    onComplete: () => {
      typing_finished.value = true;
    }
  });
});

</script>
  
<style scoped>
.terminal {
  width: 100vw;
  height: 100vh;
  background-color: #222;
  color: #fff;
  font-family: monospace;
  overflow: auto;
}

.terminal-button {
  background-color: #333; /* Color de fondo similar a la terminal */
  color: #fff; /* Color de texto blanco */
  border: none;
  padding: 10px 20px;
  font-family: monospace; /* Fuente de tipo máquina de escribir */
  font-size: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Transición suave al pasar el ratón */
  padding: 15px 30px;
  right: 50%;
}

.terminal-button:hover {
  background-color: #555; /* Cambia el color de fondo al pasar el ratón */
}

.typewriter {
  font-family: monospace;
  color: white; /* Color de texto clásico */
  font-size: 30px;
}

</style>