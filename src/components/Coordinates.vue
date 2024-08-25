<template>
    <div class="typewriter">
        <p id="typed-text-coordinates"></p>
        <p class="number-text" v-if="typing_finished"> {{ coords.join(', ') }} </p>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import Typed from 'typed.js';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {

        // Variables
        const typing_finished = ref(false);
        const store = useStore()

        // Computed
        const coords = computed(() => store.getters.get_coordinates)


        // onMounted
        onMounted(() => {

            generate_random_coords();

            new Typed('#typed-text-coordinates', {
                strings: [
                    "The robot is currently in this coordinates "
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


        // Methods
        
        const generate_random_coords = () => {
            store.dispatch('set_coordinates', [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)])
        };

       
        // Return

        return {
            typing_finished,
            coords
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

.number-text {
    font-size: 30px;
}

</style>