const DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200];
const SPEED = 200;

const state = {
  horses: [],
  races: [],
  currentRace: null,
  results: [],
  isRunning: false,
  isPaused: false
};

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
  updateProgress(state, { raceId }) {
    // Reactive update için
  },
  updateRaceStatus(state, { raceId, status }) {
    const race = state.races.find(r => r.id === raceId);
    if (race) race.status = status;
  },
  addResult(state, result) {
    state.results.push(result);
  }
};

const actions = {
  createHorses({ commit }) {
    const names = [
      'Lightning', 'Thunder', 'Storm', 'Fire', 'Wind', 'Star',
      'Shadow', 'Flash', 'Spirit', 'Dream', 'Magic', 'Power',
      'Speed', 'Rocket', 'Bullet', 'Arrow', 'Comet', 'Hero',
      'Champion', 'Winner'
    ];
    
    const colors = [
      '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
      '#00FFFF', '#800000', '#008000', '#000080', '#808000',
      '#800080', '#008080', '#FFA500', '#FFC0CB', '#A52A2A',
      '#808080', '#000000', '#F0F0F0', '#90EE90', '#FFB6C1'
    ];
    
    const horses = [];
    for (let i = 0; i < 20; i++) {
      horses.push({
        id: i + 1,
        name: names[i],
        color: colors[i],
        condition: Math.floor(Math.random() * 51) + 50
      });
    }
    commit('setHorses', horses);
  },

  createProgram({ commit, state, dispatch }) {
    if (state.horses.length === 0) {
      dispatch('createHorses');
    }
    
    const races = [];
    for (let i = 0; i < 6; i++) {
      const shuffled = [...state.horses].sort(() => Math.random() - 0.5);
      const selectedHorses = shuffled.slice(0, 10).map(horse => ({
        ...horse,
        progress: 0
      }));
      
      races.push({
        id: i + 1,
        distance: DISTANCES[i],
        horses: selectedHorses,
        status: 'waiting'
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
      commit('updateRaceStatus', { raceId, status: 'running' });

      let finished = [];
      const startTime = Date.now();

      let lastUpdateTime = Date.now(); // İlk başlangıç zamanı tanımlanmalı (global veya üst scope)

    const runRace = () => {
      if (state.isPaused) {
        setTimeout(runRace, 50);
        return;
      }

      const now = Date.now();
      const deltaTime = (now - lastUpdateTime) / 1000; // saniye cinsinden
      lastUpdateTime = now;

      let allFinished = true;

      race.horses.forEach(horse => {
        if (horse.progress >= 100) return;

        const baseSpeed = SPEED * (horse.condition / 100); // m/s
        const distancePerUpdate = baseSpeed * deltaTime;   // m
        const progressIncrease = (distancePerUpdate / race.distance) * 100;

        horse.progress += progressIncrease;

        if (horse.progress >= 100) {
          horse.progress = 100;

          if (!finished.find(f => f.horse.id === horse.id)) {
            const timeElapsed = (now - startTime) / 1000;
            const position = finished.length + 1;

            finished.push({
              horse,
              time: timeElapsed,
              position
            });

            commit('addResult', {
              raceId,
              distance: race.distance,
              horse,
              time: timeElapsed,
              position
            });
          }
        } else {
          allFinished = false;
        }
      });

      commit('updateProgress', { raceId });

      if (!allFinished) {
        setTimeout(runRace, 50);
      } else {
        commit('updateRaceStatus', { raceId, status: 'finished' });
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
  currentRace: state => state.currentRace,
  allResults: state => state.results,
  isRunning: state => state.isRunning,
  isPaused: state => state.isPaused
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}; 