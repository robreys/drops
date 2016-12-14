import {
  DROP_SET_REF,
  DROP_UPDATE,
  DROP_EDIT_CONTENT,
  DROP_ADD_CONTENT,
  DROP_DELETE_CONTENT,
  // DROP_SAVE_SUCCESS
  CONTENT_UPDATE,
  CONTENT_FORM_ADD,
  CONTENT_FORM_EDIT,
  CONTENT_FORM_CLOSE
} from '../actions/types';

const INITIAL_STATE = {
    fbref: null,
    title: '',
    description: '',
    background: '',
    content: {},
    formVisible: false,
    formContent: {},
    formEdit: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case DROP_SET_REF:
      return { ...state, fbref: action.payload };
    case DROP_UPDATE:
      // action.payload === { prop: 'name', value: 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
    case DROP_ADD_CONTENT: {
      const uid = new Date().valueOf();
      const content = { ...state.content, [uid]: action.payload };
      return { ...state, content, formVisible: false };
    }
    case DROP_EDIT_CONTENT: {
      // action.payload === { uid: 1, value: {} }
      const { uid, value } = action.payload;
      const content = { ...state.content, [uid]: value };
      return { ...state, content, formVisible: false };
    }
    case DROP_DELETE_CONTENT: {
      // action.payload === { index: 1, value: {} }
      const uid = action.payload;
      const content = { ...state.content };
      delete content[uid];
      return { ...state, content, formVisible: false };
    }
    // CONTENT FORM STUFF
    case CONTENT_UPDATE: {
      // action.payload === { prop: 'name', value: 'jane' }
      const formContent = { ...state.formContent, [action.payload.prop]: action.payload.value };
      return { ...state, formContent };
    }
    case CONTENT_FORM_EDIT: 
      return { ...state, formVisible: true, formContent: action.payload, formEdit: true };
    case CONTENT_FORM_ADD:
      return { ...state, formVisible: true, formContent: {}, formEdit: false };
    case CONTENT_FORM_CLOSE:
      return { ...state, formVisible: false };
    default:
      return state;
  }
};
