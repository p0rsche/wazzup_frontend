import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Note from "@/components/Note.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const note = {
  id: 1,
  text: "Sample note",
  link: null,
  created_at: new Date(),
  updated_at: new Date(),
};

const author = {
  id: 1,
  avatar: '',
  login: 'test',
  fullname: 'Vasya Kot',
  email: 'thecat@vasya.me'
}

describe("Note actions", () => {
  let actions;
  let store;
  let propsData;

  beforeEach(() => {
    actions = {
      shareNote: jest.fn(),
      deleteNote: jest.fn(),
      editNote: jest.fn(),
      deleteSharedNote: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
    propsData = {
      note,
      author
    };
  });

  it("dispatches shareNote when shared", () => {
    const wrapper = shallowMount(Note, {
      store,
      localVue,
      propsData,
    });
    expect(wrapper).toBeDefined();
    const sharedInput = wrapper.find("#share-note");
    sharedInput.trigger("change");
    expect(actions.shareNote).toHaveBeenCalled();
  });

  it("dispatches deleteSharedNote when unshared", () => {
    propsData.note.link = 'sharedlink';
    const wrapper = shallowMount(Note, {
      store,
      localVue,
      propsData,
    });
    expect(wrapper).toBeDefined();
    const sharedInput = wrapper.find("#share-note");
    sharedInput.trigger("change");
    expect(actions.deleteSharedNote).toHaveBeenCalled();
  });

  it("dispatches editNote when editing", () => {
    const wrapper = shallowMount(Note, {
      store,
      localVue,
      propsData,
    });
    expect(wrapper).toBeDefined();
    const btn = wrapper.find(".btn-edit-note");
    btn.trigger("click");
    expect(actions.editNote).toHaveBeenCalled();
  });

  it("dispatches deleteNote when deleting", () => {
    const wrapper = shallowMount(Note, {
      store,
      localVue,
      propsData,
    });
    expect(wrapper).toBeDefined();
    const btn = wrapper.find(".btn-delete-note");
    btn.trigger("click");
    expect(actions.deleteNote).toHaveBeenCalled();
  });
});
