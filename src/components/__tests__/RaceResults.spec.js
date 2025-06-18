import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import RaceResults from '../RaceResults.vue';

describe('RaceResults.vue', () => {
  const createStore = (results = []) => {
    return createStore({
      modules: {
        race: {
          namespaced: true,
          state: {
            results
          },
          getters: {
            results: state => state.results
          }
        }
      }
    });
  };

  it('displays empty state when no results', () => {
    const store = createStore([]);
    const wrapper = mount(RaceResults, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.text()).toContain('No results yet');
  });

  it('displays race results correctly', () => {
    const results = [{
      raceId: 1,
      distance: 1200,
      horse: { id: 1, name: 'Winner Horse', condition: 85 },
      time: 73.5,
      position: 1
    }];

    const store = createStore(results);
    const wrapper = mount(RaceResults, {
      global: {
        plugins: [store]
      }
    });

    const resultItem = wrapper.find('.result-item');
    expect(resultItem.text()).toContain('Race 1');
    expect(resultItem.text()).toContain('1200m');
    expect(resultItem.text()).toContain('Winner Horse');
    expect(resultItem.text()).toContain('73.5');
    expect(resultItem.text()).toContain('1st');
  });

  it('sorts results by race ID and position', () => {
    const results = [
      { raceId: 1, distance: 1200, horse: { name: 'Horse A' }, time: 74.0, position: 2 },
      { raceId: 1, distance: 1200, horse: { name: 'Horse B' }, time: 73.5, position: 1 },
      { raceId: 2, distance: 1400, horse: { name: 'Horse C' }, time: 85.0, position: 1 }
    ];

    const store = createStore(results);
    const wrapper = mount(RaceResults, {
      global: {
        plugins: [store]
      }
    });

    const resultItems = wrapper.findAll('.result-item');
    expect(resultItems[0].text()).toContain('Horse B');
    expect(resultItems[1].text()).toContain('Horse A');
    expect(resultItems[2].text()).toContain('Horse C');
  });
}); 