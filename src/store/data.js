import { createStore } from 'vuex';

const store = createStore({
  state: {
    // RANGE DATA
    coordinates: [],
    direction: '',
    // MAP DATA
    coords_obstacles: [],
    // LOG DATA
    log: [],
    log_obstacles: [],
  },
  mutations: {
    SET_COORDINATES(state, payload) {
      state.coordinates = payload
    },
    PATCH_COORDINATES(state, payload) {

      const new_coordinates = payload.map((value, index) => value + state.coordinates[index]);

      const is_within_bounds = new_coordinates.every(coord => coord >= 0 && coord < 100);

      const has_collision = state.coords_obstacles.some(obstacle =>
        obstacle.x === new_coordinates[0] && obstacle.y === new_coordinates[1]
      );

      if (is_within_bounds && !has_collision) {
        state.coordinates = new_coordinates;
        state.log.push(state.coordinates);
        state.log_obstacles = []
      } else {
        state.log_obstacles.push(new_coordinates)
      }
    
    },
    SET_DIRECTION(state, payload) {
      state.direction = payload
    },
    PATCH_DIRECTION(state, payload) {
      state.direction = payload
      state.log.push(state.direction)
    },
    SET_COORDS_OBSTACLES(state, payload) {
      state.coords_obstacles = payload
      console.log(state.coords_obstacles)
    },
    RESTART_GAME(state) {
      state.coords_obstacles = []
      state.log = []
      state.log_obstacles = []
    }
  },
  actions: {
    set_coordinates({commit}, data) {
      commit('SET_COORDINATES', data);
    },
    moving({commit}, data) {
      commit('PATCH_COORDINATES', data)
    },
    set_direction({commit}, data) {
      commit('SET_DIRECTION', data)
    },
    change_direction({commit}, data) {
      commit('PATCH_DIRECTION', data)
    },
    set_coords_obstacles({commit}, data) {
      commit('SET_COORDS_OBSTACLES', data)
    },
    restart_game({commit}) {
      commit('RESTART_GAME')
    }
  },
  getters: {
    get_coordinates: (state) => state.coordinates,
    get_direction: (state) => state.direction,
    get_coords_obstacles: (state) => state.coords_obstacles,
    get_log: (state) => state.log.slice(-10),
    get_log_obstacles: (state) => state.log_obstacles.slice(-1)
  }
});

export default store;