import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import HorseList from '../HorseList.vue';
import { HORSE_CONFIG } from '@/constants/horse';

describe('HorseList.vue', () => {
  const createStore = (horses = []) => {
    return createStore({
      modules: {
        race: {
          namespaced: true,
          state: {
            horses
          },
          getters: {
            horses: state => state.horses
          }
        }
      }
    });
  };

  it('displays empty state when no horses', () => {
    const store = createStore([]);
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.text()).toContain('No horses available');
  });

  it('displays correct number of horses', () => {
    const horses = Array(HORSE_CONFIG.TOTAL_HORSES).fill(null).map((_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      color: '#000000',
      condition: 50
    }));

    const store = createStore(horses);
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store]
      }
    });

    const horseItems = wrapper.findAll('.horse-item');
    expect(horseItems).toHaveLength(HORSE_CONFIG.TOTAL_HORSES);
  });

  it('displays horse details correctly', () => {
    const horse = {
      id: 1,
      name: 'Test Horse',
      color: '#FF0000',
      condition: 75
    };

    const store = createStore([horse]);
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store]
      }
    });

    const horseItem = wrapper.find('.horse-item');
    expect(horseItem.text()).toContain('Test Horse');
    expect(horseItem.text()).toContain('75%');
  });
}); 