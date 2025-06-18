import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import RaceResults from '../RaceResults.vue';

describe('RaceResults.vue', () => {
  const createVuexStore = (results = []) => {
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

  const mountComponent = (store) => {
    return mount(RaceResults, {
      global: {
        plugins: [store]
      }
    });
  };

  it('displays empty state when no results', () => {
    const store = createVuexStore([]);
    const wrapper = mountComponent(store);

    const emptyState = wrapper.find('[data-test="empty-state"]');
    expect(emptyState.exists()).toBe(true);
    expect(emptyState.text()).toContain('No Results Yet');
  });

  it('displays race results correctly', () => {
    const results = [
      {
        raceId: 1,
        distance: 1000,
        horse: { id: 1, name: 'Horse 1', color: '#FF0000' },
        time: 120,
        position: 1
      }
    ];

    const store = createVuexStore(results);
    const wrapper = mountComponent(store);

    const resultItem = wrapper.find('[data-test="result-item"]');
    expect(resultItem.exists()).toBe(true);
    expect(resultItem.text()).toContain('Race 1');
    expect(resultItem.text()).toContain('1000m');
    expect(resultItem.text()).toContain('Horse 1');
    expect(resultItem.text()).toContain('120.00s');
  });

  it('sorts and groups results by race ID and position', () => {
    const results = [
      {
        raceId: 1,
        distance: 1000,
        horse: { id: 1, name: 'Horse 1', color: '#FF0000' },
        time: 120,
        position: 2
      },
      {
        raceId: 1,
        distance: 1000,
        horse: { id: 2, name: 'Horse 2', color: '#00FF00' },
        time: 110,
        position: 1
      }
    ];

    const store = createVuexStore(results);
    const wrapper = mountComponent(store);

    const resultItems = wrapper.findAll('[data-test="result-item"]');
    expect(resultItems).toHaveLength(1); // Should be grouped by race ID

    const positions = wrapper.findAll('.w-4.h-4').map(el => el.text());
    expect(positions).toEqual(['1', '2']);
  });
}); 