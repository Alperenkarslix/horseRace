import { describe, it, expect } from 'vitest';
import { createStore } from 'vuex';
import { RACE_STATUS, RACE_CONFIG } from '@/constants/race';
import { HORSE_CONFIG } from '@/constants/horse';

const createFreshStore = () => {
  const state = {
    horses: [],
    races: [],
    currentRace: null,
    results: [],
    isRunning: false,
    isPaused: false
  };

  return createStore({
    modules: {
      race: {
        namespaced: true,
        state,
        mutations: {
          setHorses(state, horses) {
            state.horses = horses;
          },
          setRaces(state, races) {
            state.races = races;
          }
        },
        actions: {
          createHorses({ commit }) {
            const horses = [];
            for (let i = 0; i < HORSE_CONFIG.TOTAL_HORSES; i++) {
              horses.push({
                id: i + 1,
                name: `Horse ${i + 1}`,
                color: '#000000',
                condition: HORSE_CONFIG.MIN_CONDITION
              });
            }
            commit('setHorses', horses);
          },
          createProgram({ commit, state, dispatch }) {
            if (state.horses.length === 0) {
              dispatch('createHorses');
            }
            
            const races = [];
            for (let i = 0; i < RACE_CONFIG.TOTAL_RACES; i++) {
              races.push({
                id: i + 1,
                distance: 1200,
                horses: state.horses.slice(0, RACE_CONFIG.HORSES_PER_RACE).map(horse => ({
                  ...horse,
                  progress: 0
                })),
                status: RACE_STATUS.WAITING
              });
            }
            commit('setRaces', races);
          }
        }
      }
    }
  });
};

describe('race store module', () => {
  it('creates correct number of horses with valid properties', async () => {
    const store = createFreshStore();
    await store.dispatch('race/createHorses');
    
    expect(store.state.race.horses).toHaveLength(HORSE_CONFIG.TOTAL_HORSES);
    
    const firstHorse = store.state.race.horses[0];
    expect(firstHorse).toHaveProperty('id');
    expect(firstHorse).toHaveProperty('name');
    expect(firstHorse).toHaveProperty('color');
    expect(firstHorse).toHaveProperty('condition');
  });

  it('creates correct number of races with proper structure', async () => {
    const store = createFreshStore();
    await store.dispatch('race/createProgram');
    
    expect(store.state.race.races).toHaveLength(RACE_CONFIG.TOTAL_RACES);
    
    const firstRace = store.state.race.races[0];
    expect(firstRace).toHaveProperty('id');
    expect(firstRace).toHaveProperty('distance');
    expect(firstRace).toHaveProperty('horses');
    expect(firstRace).toHaveProperty('status');
    expect(firstRace.status).toBe(RACE_STATUS.WAITING);
    expect(firstRace.horses).toHaveLength(RACE_CONFIG.HORSES_PER_RACE);
  });
}); 