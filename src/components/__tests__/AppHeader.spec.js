import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AppHeader from '../AppHeader.vue';

describe('AppHeader.vue', () => {
  const createVuexStore = (state = {}) => {
    const actions = {
      createProgram: vi.fn(),
      togglePause: vi.fn(),
      restart: vi.fn(),
      startRaces: vi.fn()
    };

    const store = createStore({
      modules: {
        race: {
          namespaced: true,
          state: {
            isRunning: false,
            isPaused: false,
            allRaces: [],
            ...state
          },
          getters: {
            isRunning: state => state.isRunning,
            isPaused: state => state.isPaused,
            allRaces: state => state.allRaces
          },
          mutations: {
            setIsPaused(state, value) {
              state.isPaused = value;
            }
          },
          actions
        }
      }
    });

    // Expose actions for testing
    store.actions = actions;

    return store;
  };

  it('displays correct title', () => {
    const store = createVuexStore();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.find('h1').text()).toBe('Horse Racing');
  });

  it('shows and triggers "GENERATE PROGRAM" button when not running', async () => {
    const store = createVuexStore({ isRunning: false });
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store]
      }
    });

    const generateButton = wrapper.find('button[data-test="generate-program"]');
    expect(generateButton.exists()).toBe(true);
    expect(generateButton.text()).toBe('GENERATE PROGRAM');
    
    await generateButton.trigger('click');
    expect(store.actions.createProgram).toHaveBeenCalled();
  });

  it('shows and triggers "START RACES" button when program is generated', async () => {
    const store = createVuexStore({ isRunning: false, allRaces: [{ id: 1 }] });
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store]
      }
    });

    const startButton = wrapper.find('button[data-test="toggle-pause"]');
    expect(startButton.exists()).toBe(true);
    expect(startButton.text()).toBe('START RACES');
    
    await startButton.trigger('click');
    expect(store.actions.togglePause).toHaveBeenCalled();
  });

  it('shows and triggers "PAUSE/RESUME" button when running', async () => {
    const store = createVuexStore({ isRunning: true, isPaused: false });
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store]
      }
    });

    const pauseButton = wrapper.find('button[data-test="toggle-pause"]');
    expect(pauseButton.exists()).toBe(true);
    expect(pauseButton.text()).toBe('PAUSE');
    
    await pauseButton.trigger('click');
    expect(store.actions.togglePause).toHaveBeenCalled();

    // Update store state to test RESUME button
    store.commit('race/setIsPaused', true);
    await wrapper.vm.$nextTick();
    
    expect(pauseButton.text()).toBe('RESUME');
  });

  it('shows and triggers "RESTART" button when all races are finished', async () => {
    const store = createVuexStore({
      allRaces: [
        { status: 'finished' },
        { status: 'finished' }
      ]
    });
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store]
      }
    });

    const restartButton = wrapper.find('button[data-test="restart"]');
    expect(restartButton.exists()).toBe(true);
    expect(restartButton.text()).toBe('RESTART');
    
    await restartButton.trigger('click');
    expect(store.actions.restart).toHaveBeenCalled();
  });
}); 