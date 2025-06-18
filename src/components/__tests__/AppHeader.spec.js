import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AppHeader from '../AppHeader.vue';

describe('AppHeader.vue', () => {
  const createStore = (state = {}) => {
    return createStore({
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
          actions: {
            createProgram: vi.fn(),
            togglePause: vi.fn(),
            restart: vi.fn()
          }
        }
      }
    });
  };

  it('displays correct title', () => {
    const store = createStore();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.find('h1').text()).toBe('Horse Racing');
  });

  it('shows "GENERATE PROGRAM" button when not running', () => {
    const store = createStore({ isRunning: false });
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store]
      }
    });

    const button = wrapper.findAll('button').find(b => b.text() === 'GENERATE PROGRAM');
    expect(button).toBeTruthy();
  });

  it('shows "START RACES" button when not running', () => {
    const store = createStore({ isRunning: false });
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store]
      }
    });

    const button = wrapper.findAll('button').find(b => b.text() === 'START RACES');
    expect(button).toBeTruthy();
  });

  it('shows "PAUSE" button when running and not paused', () => {
    const store = createStore({ isRunning: true, isPaused: false });
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store]
      }
    });

    const button = wrapper.findAll('button').find(b => b.text() === 'PAUSE');
    expect(button).toBeTruthy();
  });

  it('shows "RESUME" button when running and paused', () => {
    const store = createStore({ isRunning: true, isPaused: true });
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [store]
      }
    });

    const button = wrapper.findAll('button').find(b => b.text() === 'RESUME');
    expect(button).toBeTruthy();
  });

  it('shows "RESTART" button when all races are finished', () => {
    const store = createStore({
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

    const button = wrapper.findAll('button').find(b => b.text() === 'RESTART');
    expect(button).toBeTruthy();
  });
}); 