<template>
  <div class="terminal">
    <div class="grid justify-content-around m-0 p-0 mt-3">
      <div class="col-4">
        <Coordinates/>
      </div>
      <div class="col-4">
        <Direction/>
      </div>
    </div>
    <div class="grid justify-content-around m-0 p-0 mt-3">
      <div class="col-4">
        <Instructions/>
      </div>
      <div class="col-4">
        <Log/>
        <div class="flex mt-3">
            <span v-if="log_obstacles.length > 0">
              <p class="warning-message"> YOU'VE FOUND AN OBSTACLE IN {{ log_obstacles.join(', ') }} CHANGE YOUR DIRECTION. </p>
            </span>
        </div>
      </div>
    </div>
    <div class="flex justify-content-center">
      <button class="terminal-button" @click="restart_mission"> Restart mission </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

import Coordinates from '@/components/Coordinates.vue';
import Direction from '@/components/Direction.vue';
import Instructions from '@/components/Instructions.vue';
import Log from '@/components/Log.vue';

// Variables
const store = useStore()
const router = useRouter()
const obstacles = ref<{ x: number; y: number; }[]>([]);

// Computed
const log_obstacles = computed(() => store.getters.get_log_obstacles)

// Methods
const generate_obstacles = () => {
    obstacles.value = [];
    const num_obs = 400

    for (let i = 0; i < num_obs; i++) {
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);

        const obs = {x: x, y: y}

        obstacles.value.push(obs);
    }

    store.dispatch('set_coords_obstacles', obstacles.value)
};

const restart_mission = () => {
  store.dispatch('restart_game')
  router.push('/')
}

onMounted(() => {
    generate_obstacles(); // Call the function on component mount
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

.warning-message{
  color: red;
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

</style>