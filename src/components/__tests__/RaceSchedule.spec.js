import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import RaceSchedule from '../RaceSchedule.vue';
import { RACE_STATUS } from '@/constants/race';

describe('RaceSchedule.vue', () => {
  const createStore = (races = []) => {
    return createStore({
      modules: {
        race: {
          namespaced: true,
          state: {
            races
          },
          getters: {
            allRaces: state => state.races
          }
        }
      }
    });
  };

  it('displays empty state when no races', () => {
    const store = createStore([]);
    const wrapper = mount(RaceSchedule, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.text()).toContain('No races scheduled');
  });

  it('displays race details correctly', () => {
    const races = [{
      id: 1,
      distance: 1200,
      status: RACE_STATUS.WAITING,
      horses: [
        { id: 1, name: 'Horse 1', condition: 75 },
        { id: 2, name: 'Horse 2', condition: 80 }
      ]
    }];

    const store = createStore(races);
    const wrapper = mount(RaceSchedule, {
      global: {
        plugins: [store]
      }
    });

    const raceItem = wrapper.find('.race-item');
    expect(raceItem.text()).toContain('Race 1');
    expect(raceItem.text()).toContain('1200m');
    expect(raceItem.text()).toContain('Horse 1');
    expect(raceItem.text()).toContain('Horse 2');
  });

  it('displays correct status indicators', () => {
    const races = [
      { id: 1, distance: 1200, status: RACE_STATUS.WAITING, horses: [] },
      { id: 2, distance: 1400, status: RACE_STATUS.RUNNING, horses: [] },
      { id: 3, distance: 1600, status: RACE_STATUS.FINISHED, horses: [] }
    ];

    const store = createStore(races);
    const wrapper = mount(RaceSchedule, {
      global: {
        plugins: [store]
      }
    });

    const statuses = wrapper.findAll('.race-status');
    expect(statuses[0].text()).toContain('Waiting');
    expect(statuses[1].text()).toContain('Running');
    expect(statuses[2].text()).toContain('Finished');
  });
}); 