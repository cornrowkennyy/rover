<template>
    <div class="typewriter">
        <p id="typed-text-direction"></p>
        <p class="direction-text" v-if="typing_finished"> {{ direction }} </p>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import Typed from 'typed.js';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {

        // Variables
        const store = useStore()
        const typing_finished = ref(false);

        // Computed
        const direction = computed(() => store.getters.get_direction)

        // onMOunted
        onMounted(() => {
            new Typed('#typed-text-direction', {
                strings: [
                    "The robot is currently facing this direction"
                ],
                typeSpeed: 10,
                backSpeed: 0,
                smartBackspace: false,
                loop: false,
                showCursor: false,
                onComplete: () => {
                    typing_finished.value = true;
                }
            })
        });

        const generate_random_direction = () => {
            const directions = ['NORTH', 'SOUTH', 'WEST', 'EAST'];
            const random_dir = Math.floor(Math.random() * directions.length);
            store.dispatch('set_direction', directions[random_dir])
        }

        // Llamamos a la función para generar los números iniciales
        generate_random_direction();

        return {
            direction,
            typing_finished
        };
    },
});

</script>

<style scoped>

.typewriter {
    font-family: monospace;
    color: white; /* Color de texto clásico */
    font-size: 20px;
}

.direction-text {
    font-size: 30px;
}

</style>