import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createStore } from 'vuex';
import { RACE_STATUS, RACE_CONFIG } from '@/constants/race';
import { HORSE_CONFIG } from '@/constants/horse';

describe('race store module', () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        race: {
          namespaced: true,
          state: {
            horses: [],
            races: [],
            currentRace: null,
            results: [],
            isRunning: false,
            isPaused: false
          },
          mutations: {
            setHorses(state, horses) {
              state.horses = horses;
            },
            setRaces(state, races) {
              state.races = races;
            },
            setIsRunning(state, isRunning) {
              state.isRunning = isRunning;
            },
            setIsPaused(state, isPaused) {
              state.isPaused = isPaused;
            },
            setCurrentRace(state, race) {
              state.currentRace = race;
            },
            updateRaceProgress(state, { raceId, horseId, progress }) {
              const race = state.races.find(r => r.id === raceId);
              if (race) {
                const horse = race.horses.find(h => h.id === horseId);
                if (horse) {
                  horse.progress = progress;
                }
              }
            }
          },
          actions: {
            createHorses({ commit }) {
              const horses = Array(HORSE_CONFIG.TOTAL_HORSES).fill(null).map((_, i) => ({
                id: i + 1,
                name: `Horse ${i + 1}`,
                color: '#000000',
                condition: HORSE_CONFIG.MIN_CONDITION
              }));
              commit('setHorses', horses);
            },
            createProgram({ commit, state, dispatch }) {
              if (state.horses.length === 0) {
                dispatch('createHorses');
              }
              
              const races = Array(RACE_CONFIG.TOTAL_RACES).fill(null).map((_, i) => ({
                id: i + 1,
                distance: RACE_CONFIG.DISTANCE,
                horses: state.horses
                  .sort(() => Math.random() - 0.5)
                  .slice(0, RACE_CONFIG.HORSES_PER_RACE)
                  .map(horse => ({
                    ...horse,
                    progress: 0
                  })),
                status: RACE_STATUS.WAITING
              }));
              commit('setRaces', races);
            },
            startRaces: vi.fn(),
            togglePause: vi.fn(),
            restart: vi.fn()
          }
        }
      }
    });
  });

  it('creates correct number of horses with valid properties', async () => {
    await store.dispatch('race/createHorses');
    
    expect(store.state.race.horses).toHaveLength(HORSE_CONFIG.TOTAL_HORSES);
    
    const firstHorse = store.state.race.horses[0];
    expect(firstHorse).toHaveProperty('id', 1);
    expect(firstHorse).toHaveProperty('name', 'Horse 1');
    expect(firstHorse).toHaveProperty('color', '#000000');
    expect(firstHorse.condition).toBeGreaterThanOrEqual(HORSE_CONFIG.MIN_CONDITION);
    expect(firstHorse.condition).toBeLessThanOrEqual(HORSE_CONFIG.MAX_CONDITION);
  });

  it('creates correct number of races with proper structure', async () => {
    await store.dispatch('race/createProgram');
    
    expect(store.state.race.races).toHaveLength(RACE_CONFIG.TOTAL_RACES);
    
    const firstRace = store.state.race.races[0];
    expect(firstRace).toHaveProperty('id', 1);
    expect(firstRace).toHaveProperty('distance', RACE_CONFIG.DISTANCE);
    expect(firstRace.horses).toHaveLength(RACE_CONFIG.HORSES_PER_RACE);
    expect(firstRace.status).toBe(RACE_STATUS.WAITING);
    
    const firstHorseInRace = firstRace.horses[0];
    expect(firstHorseInRace).toHaveProperty('progress', 0);
  });

  it('updates race progress correctly', () => {
    // Setup initial state
    store.commit('race/setRaces', [{
      id: 1,
      distance: RACE_CONFIG.DISTANCE,
      horses: [
        { id: 1, name: 'Horse 1', progress: 0 },
        { id: 2, name: 'Horse 2', progress: 0 }
      ],
      status: RACE_STATUS.RUNNING
    }]);

    // Update progress
    store.commit('race/updateRaceProgress', {
      raceId: 1,
      horseId: 1,
      progress: 50
    });

    const updatedHorse = store.state.race.races[0].horses[0];
    expect(updatedHorse.progress).toBe(50);
  });

  it('handles race state transitions correctly', () => {
    // Setup initial state
    store.commit('race/setIsRunning', true);
    expect(store.state.race.isRunning).toBe(true);

    // Test pause state
    store.commit('race/setIsPaused', true);
    expect(store.state.race.isPaused).toBe(true);

    // Test resume state
    store.commit('race/setIsPaused', false);
    expect(store.state.race.isPaused).toBe(false);

    // Test stop state
    store.commit('race/setIsRunning', false);
    expect(store.state.race.isRunning).toBe(false);
    expect(store.state.race.isPaused).toBe(false);
  });

  it('sets and updates current race correctly', () => {
    const race = {
      id: 1,
      distance: RACE_CONFIG.DISTANCE,
      horses: [
        { id: 1, name: 'Horse 1', progress: 0 },
        { id: 2, name: 'Horse 2', progress: 0 }
      ],
      status: RACE_STATUS.RUNNING
    };

    store.commit('race/setCurrentRace', race);
    expect(store.state.race.currentRace).toEqual(race);
  });
}); 