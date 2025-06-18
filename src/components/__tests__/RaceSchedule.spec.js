import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import RaceSchedule from '../RaceSchedule.vue';
import { RACE_STATUS } from '@/constants/race';

describe('RaceSchedule.vue', () => {
  const createVuexStore = (races = []) => {
    return createStore({
      modules: {
        race: {
          namespaced: true,
          state: {
            races,
            isPaused: false
          },
          getters: {
            allRaces: state => state.races,
            isPaused: state => state.isPaused
          }
        }
      }
    });
  };

  const mountComponent = (store) => {
    return mount(RaceSchedule, {
      global: {
        plugins: [store]
      }
    });
  };

  it('displays empty state when no races', () => {
    const store = createVuexStore([]);
    const wrapper = mountComponent(store);

    expect(wrapper.text()).toContain('No races scheduled');
  });

  it('displays race details correctly', () => {
    const races = [
      {
        id: 1,
        distance: 1000,
        horses: [
          { id: 1, name: 'Horse 1', color: '#FF0000' },
          { id: 2, name: 'Horse 2', color: '#00FF00' }
        ],
        status: RACE_STATUS.WAITING
      }
    ];

    const store = createVuexStore(races);
    const wrapper = mountComponent(store);

    const raceItem = wrapper.find('[data-test="race-item"]');
    expect(raceItem.exists()).toBe(true);
    expect(raceItem.text()).toContain('Race 1');
    expect(raceItem.text()).toContain('1000m');
    expect(raceItem.text()).toContain('Horse 1');
    expect(raceItem.text()).toContain('Horse 2');
  });

  it('displays correct status indicators', () => {
    const races = [
      { id: 1, distance: 1000, horses: [], status: RACE_STATUS.WAITING },
      { id: 2, distance: 1200, horses: [], status: RACE_STATUS.RUNNING },
      { id: 3, distance: 1400, horses: [], status: RACE_STATUS.FINISHED }
    ];

    const store = createVuexStore(races);
    const wrapper = mountComponent(store);

    const statusIndicators = wrapper.findAll('[data-test="race-status"]');
    expect(statusIndicators).toHaveLength(3);
    expect(statusIndicators[0].text()).toBe('Waiting');
    expect(statusIndicators[1].text()).toBe('Racing');
    expect(statusIndicators[2].text()).toBe('Finished');
  });
}); 