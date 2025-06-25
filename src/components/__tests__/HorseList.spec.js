import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import HorseList from '../HorseList.vue';
import HorseItem from '../ui/HorseItem.vue';
import { HORSE_CONFIG } from '@/constants/horse';

describe('HorseList.vue', () => {
  const createVuexStore = (horses = []) => {
    const actions = {
      createHorses: vi.fn()
    };

    const store = createStore({
      modules: {
        race: {
          namespaced: true,
          state: {
            horses
          },
          getters: {
            allHorses: state => state.horses
          },
          actions
        }
      }
    });

    // Expose actions for testing
    store.actions = actions;

    return store;
  };

  const mountComponent = (store) => {
    return mount(HorseList, {
      global: {
        plugins: [store]
      }
    });
  };

  it('displays empty state when no horses', () => {
    const store = createVuexStore([]);
    const wrapper = mountComponent(store);

    const emptyState = wrapper.find('[data-test="empty-state"]');
    expect(emptyState.exists()).toBe(true);
    expect(emptyState.text()).toBe('No horses available');
  });

  it('displays correct number of horses', () => {
    const horses = Array(HORSE_CONFIG.TOTAL_HORSES).fill(null).map((_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      color: '#000000',
      condition: 50
    }));

    const store = createVuexStore(horses);
    const wrapper = mountComponent(store);

    const horseItems = wrapper.findAllComponents(HorseItem);
    expect(horseItems).toHaveLength(HORSE_CONFIG.TOTAL_HORSES);
  });

  it('passes correct props to HorseItem component', () => {
    const horse = {
      id: 1,
      name: 'Test Horse',
      color: '#FF0000',
      condition: 75
    };

    const store = createVuexStore([horse]);
    const wrapper = mountComponent(store);

    const horseItem = wrapper.findComponent(HorseItem);
    expect(horseItem.exists()).toBe(true);
    expect(horseItem.props('horse')).toEqual(horse);
  });

  it('updates horse list when store changes', async () => {
    const store = createVuexStore([]);
    const wrapper = mountComponent(store);

    // Initial state
    expect(wrapper.find('[data-test="empty-state"]').exists()).toBe(true);

    // Add a horse
    const newHorse = {
      id: 1,
      name: 'New Horse',
      color: '#00FF00',
      condition: 60
    };

    store.state.race.horses.push(newHorse);
    await wrapper.vm.$nextTick();

    const horseItem = wrapper.findComponent(HorseItem);
    expect(horseItem.exists()).toBe(true);
    expect(horseItem.props('horse')).toEqual(newHorse);
  });

  it('sorts horses by condition', async () => {
    const horses = [
      { id: 1, name: 'Horse 1', color: '#000000', condition: 30 },
      { id: 2, name: 'Horse 2', color: '#000000', condition: 90 },
      { id: 3, name: 'Horse 3', color: '#000000', condition: 60 }
    ];

    const store = createVuexStore(horses);
    const wrapper = mountComponent(store);

    const horseItems = wrapper.findAllComponents(HorseItem);
    const conditions = horseItems.map(item => item.props('horse').condition);
    
    expect(conditions).toEqual([90, 60, 30]);
  });

  it('calls createHorses action when mounted with no horses', () => {
    const store = createVuexStore([]);
    mountComponent(store);
    expect(store.state.race.horses).toHaveLength(0);
    expect(store.actions.createHorses).toHaveBeenCalled();
  });
}); 