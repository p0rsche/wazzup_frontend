import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import NavBar from "@/components/NavBar.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

test("should render navbar", () => {
  const wrapper = shallowMount(NavBar);
  expect(wrapper).toBeDefined();
});

describe("Navbar actions", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      openModal: jest.fn(),
      logout: jest.fn()
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it('dispatches openModal when clicked "Add new Note"', () => {
    const wrapper = shallowMount(NavBar, { store, localVue });
    const link = wrapper.find('.add-new-note');
    link.trigger('click');
    expect(actions.openModal).toHaveBeenCalled();
  });

  it('dispatches logout when clicked "Sign out"', async () => {
    const wrapper = shallowMount(NavBar, { store, localVue, data() {
      return {
        isActive: true
      }
    } });
    const link = wrapper.find('.link-sign-out');
    link.trigger('click');
    expect(actions.logout).toHaveBeenCalled();
  });
});
