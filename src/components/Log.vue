<template>
    <div class="flex mb-1">
        <div class="title-control"> 
            <h2> LOG </h2>
        </div>
    </div>
    <div class="flex mb-3">
        <h2> The last 10 actions...</h2>
    </div> 
    <div v-for="item in log">
        <span v-if="typeof(item) === 'string'">
            <p> Changed direction to {{ item }}</p>
        </span>
        <span v-else>
            <p> Moved to {{ item.join(', ') }} </p>
        </span>
    </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex'; 

// Variables
const store = useStore();

// Computed
const log = computed(() => store.getters.get_log)

</script>

<style scoped>

.title-control {
    font-size: 30px;
}

</style>