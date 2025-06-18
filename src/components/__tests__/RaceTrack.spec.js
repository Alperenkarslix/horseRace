import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import RaceTrack from '../RaceTrack.vue';

describe('RaceTrack.vue', () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        race: {
          namespaced: true,
          state: {
            currentRace: null
          },
          getters: {
            currentRace: state => state.currentRace
          }
        }
      }
    });
  });

  it('displays "No Active Race" message when there is no current race', () => {
    const wrapper = mount(RaceTrack, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.text()).toContain('No Active Race');
    expect(wrapper.text()).toContain('Click "GENERATE PROGRAM" then "START RACES"');
  });

  it('displays race track with horses when there is an active race', async () => {
    store.state.race.currentRace = {
      id: 1,
      distance: 1200,
      horses: [
        { id: 1, name: 'Test Horse', color: '#FF0000', progress: 0 }
      ]
    };

    const wrapper = mount(RaceTrack, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.text()).toContain('RACE TRACK');
    expect(wrapper.text()).toContain('Test Horse');
    expect(wrapper.text()).toContain('Race 1 - 1200m');
  });
}); 