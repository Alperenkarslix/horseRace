import { RACE_DISTANCES, RACE_STATUS, BASE_SPEED, RACE_CONFIG } from '@/constants/race';
import { HORSE_NAMES, HORSE_COLORS, HORSE_CONFIG } from '@/constants/horse';

const getInitialState = () => ({
  horses: [],
  races: [],
  currentRace: null,
  results: [],
  isRunning: false,
  isPaused: false
});

const state = getInitialState();

const mutations = {
  setHorses(state, horses) {
    state.horses = horses;
  },
  setRaces(state, races) {
    state.races = races;
  },
  setCurrentRace(state, race) {
    state.currentRace = race;
  },
  setRunning(state, value) {
    state.isRunning = value;
  },
  setPaused(state, value) {
    state.isPaused = value;
  },
  updateProgress() {
  },
  updateRaceStatus(state, { raceId, status }) {
    const race = state.races.find(r => r.id === raceId);
    if (race) race.status = status;
  },
  addResult(state, result) {
    state.results.push(result);
  },
  resetState(state) {
    const freshState = getInitialState();
    Object.keys(freshState).forEach(key => {
      state[key] = freshState[key];
    });
  }
};

const actions = {
  createHorses({ commit }) {
    const horses = [];
    for (let i = 0; i < HORSE_CONFIG.TOTAL_HORSES; i++) {
      horses.push({
        id: i + 1,
        name: HORSE_NAMES[i],
        color: HORSE_COLORS[i],
        condition: Math.floor(Math.random() * HORSE_CONFIG.CONDITION_RANGE) + HORSE_CONFIG.MIN_CONDITION
      });
    }
    commit('setHorses', horses);
  },

  restart({ commit, dispatch }) {
    commit('resetState');
    commit('setCurrentRace', null);
    setTimeout(() => {
      dispatch('createProgram');
    }, 0);
  },

  createProgram({ commit, state, dispatch }) {
    if (state.horses.length === 0) {
      dispatch('createHorses');
    }
    
    const races = [];
    for (let i = 0; i < RACE_CONFIG.TOTAL_RACES; i++) {
      const shuffled = [...state.horses].sort(() => Math.random() - 0.5);
      const selectedHorses = shuffled.slice(0, RACE_CONFIG.HORSES_PER_RACE).map(horse => ({
        ...horse,
        progress: 0
      }));
      
      races.push({
        id: i + 1,
        distance: RACE_DISTANCES[i],
        horses: selectedHorses,
        status: RACE_STATUS.WAITING
      });
    }
    commit('setRaces', races);
  },

  startRace({ commit, state }, raceId) {
    return new Promise((resolve) => {
      const race = state.races.find(r => r.id === raceId);
      if (!race) {
        resolve();
        return;
      }

      commit('setCurrentRace', race);
      commit('updateRaceStatus', { raceId, status: RACE_STATUS.RUNNING });

      let finished = [];
      let startTime = Date.now();
      let lastUpdateTime = Date.now();
      let pauseStartTime = null;
      let totalPausedTime = 0;

      const runRace = () => {
        if (state.isPaused) {
          if (!pauseStartTime) {
            pauseStartTime = Date.now();
          }
          setTimeout(runRace, RACE_CONFIG.UPDATE_INTERVAL);
          return;
        }

        const now = Date.now();

        if (pauseStartTime) {
          const pauseDuration = now - pauseStartTime;
          totalPausedTime += pauseDuration;
          lastUpdateTime = now;
          pauseStartTime = null;
        }

        const deltaTime = (now - lastUpdateTime) / 1000;
        lastUpdateTime = now;

        let allFinished = true;

        race.horses.forEach(horse => {
          if (horse.progress >= 100) return;

          const baseSpeed = BASE_SPEED * (horse.condition / 100);
          const distancePerUpdate = baseSpeed * deltaTime;
          const progressIncrease = (distancePerUpdate / race.distance) * 100;

          horse.progress += progressIncrease;

          if (horse.progress >= 100) {
            horse.progress = 100;

            if (!finished.find(f => f.horse.id === horse.id)) {
              const effectiveTime = (now - startTime - totalPausedTime) / 1000;
              const position = finished.length + 1;

              finished.push({
                horse,
                time: effectiveTime,
                position
              });

              commit('addResult', {
                raceId,
                distance: race.distance,
                horse,
                time: effectiveTime,
                position
              });
            }
          } else {
            allFinished = false;
          }
        });

        commit('updateProgress', { raceId });

        if (!allFinished) {
          setTimeout(runRace, RACE_CONFIG.UPDATE_INTERVAL);
        } else {
          commit('updateRaceStatus', { raceId, status: RACE_STATUS.FINISHED });
          resolve();
        }
      };

      runRace();
    });
  },

  async startAll({ dispatch, state, commit }) {
    if (state.races.length === 0) return;

    commit('setRunning', true);
    commit('setPaused', false);

    for (const race of state.races) {
      if (race.status === 'waiting') {
        await dispatch('startRace', race.id);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (state.isPaused) break;
      }
    }

    commit('setRunning', false);
  },

  togglePause({ commit, state, dispatch }) {
    if (!state.isRunning) {
      dispatch('startAll');
    } else {
      commit('setPaused', !state.isPaused);
    }
  }
};

const getters = {
  allHorses: state => state.horses,
  allRaces: state => state.races,
  isRunning: state => state.isRunning,
  isPaused: state => state.isPaused,
  currentRace: state => state.currentRace,
  results: state => state.results
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}; 