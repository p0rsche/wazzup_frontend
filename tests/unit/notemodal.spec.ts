import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import NoteModal from "@/components/NoteModal.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("New Note modal", () => {
  let actions;
  let store;
  let getters;
  let modal;

  beforeEach(() => {
    modal = {
      isOpen: false,
      isEdit: false,
      noteId: -1,
      text: "",
    }
    actions = {
      closeModal: jest.fn(),
      saveNote: jest.fn(),
      deleteNote: jest.fn(),
      createNote: jest.fn(),
    };
    getters = {
      isEditModal: () => modal.isEdit,
    }
    store = new Vuex.Store({
      actions,
      getters,
      state: {
        modal
      },
    });
  });

  it("should dispatch closeModal when clicked close btn", () => {
    const wrapper = shallowMount(NoteModal, {
      store,
      localVue,
    });
    expect(wrapper).toBeDefined();
    const closeBtn = wrapper.find(".btn-cancel");
    closeBtn.trigger("click");
    expect(actions.closeModal).toHaveBeenCalled();
  });

  it("should return correct title", async () => {
    const wrapper = shallowMount(NoteModal, {
      store,
      localVue,
    });
    expect(wrapper).toBeDefined();
    const title = wrapper.find("#modal-headline");
    expect(title.text()).toContain('Add new note');
  });

  it("should follow createNote flow", async () => {
    const wrapper = shallowMount(NoteModal, {
      store,
      localVue,
    });
    expect(wrapper).toBeDefined();
    const btn = wrapper.find(".btn-proceed");
    expect(btn.text()).toContain('Add new note');
    btn.trigger('click');
    expect(actions.createNote).not.toHaveBeenCalled();
    await wrapper.setData({ text: 'more than 3 chars length text'});
    btn.trigger('click');
    expect(actions.createNote).toHaveBeenCalled();        
  });
  

  it("should show error", async () => {
    const error = 'should be an error';
    const wrapper = shallowMount(NoteModal, {
      store,
      localVue,
    });
    expect(wrapper).toBeDefined();
    await wrapper.setData({ error });
    const pgrph = wrapper.find(".error-txt");
    expect(pgrph).toBeDefined();
    expect(pgrph.text()).toContain(error);       
  });
});

describe("Edit Note modal", () => {
  let actions;
  let store;
  let getters;
  let modal;

  beforeEach(() => {
    modal = {
      isOpen: false,
      isEdit: true,
      noteId: 1,
      text: "some text",
    }
    actions = {
      closeModal: jest.fn(),
      saveNote: jest.fn(),
      deleteNote: jest.fn(),
      createNote: jest.fn(),
    };
    getters = {
      isEditModal: () => modal.isEdit,
    }
    store = new Vuex.Store({
      actions,
      getters,
      state: {
        modal
      },
    });
  });

  it("should return correct title", async () => {
    const wrapper = shallowMount(NoteModal, {
      store,
      localVue,
    });
    expect(wrapper).toBeDefined();
    const title = wrapper.find("#modal-headline");
    expect(title.text()).toContain('Edit note');
  });

  it("should save note", async () => {
    const wrapper = shallowMount(NoteModal, {
      store,
      localVue,
    });
    expect(wrapper).toBeDefined();
    const btn = wrapper.find(".btn-proceed");
    expect(btn.text()).toContain('Save');
    btn.trigger('click');
    expect(actions.saveNote).toHaveBeenCalled();
    expect(actions.deleteNote).not.toHaveBeenCalled();
    expect(actions.closeModal).not.toHaveBeenCalled();  
  });

  it("should delete note", async () => {
    const wrapper = shallowMount(NoteModal, {
      store,
      localVue,
    });
    expect(wrapper).toBeDefined();
    const btn = wrapper.find(".btn-proceed");
    expect(btn.text()).toContain('Save');
    await wrapper.setData({ text: '' })
    btn.trigger('click');
    expect(actions.saveNote).not.toHaveBeenCalled();
    expect(actions.deleteNote).toHaveBeenCalled();
    expect(actions.closeModal).toHaveBeenCalled();    
  });

});

