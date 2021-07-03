import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/actions';

// TEXT REDUCERS MOUNTING
const textState = '';

const addTaskTextHandler = () => '';

const updateNewTaskTextHandler = (_state, { payload: { text } }) => text;

const textHandlers = {
  [actions.addTask]: addTaskTextHandler,
  [actions.updateNewTaskText]: updateNewTaskTextHandler,
};

const textReducer = handleActions(textHandlers, textState);

// TASKS REDUCERS MOUNTING
const tasksState = {
  byId: {},
  allIds: [],
};

const addTaskHandler = (state, { payload: { task } }) => {
  const { byId, allIds } = state;
  return {
    byId: { ...byId, [task.id]: task },
    allIds: [task.id, ...allIds],
  };
};

const removeTaskHandler = (state, { payload: { id } }) => {
  const { byId, allIds } = state;
  return {
    byId: _.omit(byId, id),
    allIds: _.without(allIds, id),
  };
};

const toggleTaskStateHandler = (state, { payload: { id } }) => {
  const { byId, allIds } = state;
  const newTaskState = byId[id].state === 'active' ? 'finished' : 'active';
  return {
    byId: { ...byId, [id]: { ...byId[id], state: newTaskState } },
    allIds: [...allIds],
  };
};

const tasksHandlers = {
  [actions.addTask]: addTaskHandler,
  [actions.removeTask]: removeTaskHandler,
  [actions.toggleTaskState]: toggleTaskStateHandler,
};

const tasksReducer = handleActions(tasksHandlers, tasksState);

// TASKS UI STATE MOUNTING
const tasksUiState = {};

const addTaskUiStateHandler = (state, { payload: { task } }) => ({
  ...state,
  [task.id]: { theme: 'light' },
});

const inverseTaskThemeHandler = (state, { payload: { id } }) => {
  const newTheme = state[id].theme === 'light' ? 'primary' : 'light';
  return {
    ...state,
    [id]: { theme: newTheme },
  };
};

const tasksUiStateHandlers = {
  [actions.addTask]: addTaskUiStateHandler,
  [actions.inverseTaskTheme]: inverseTaskThemeHandler,
};

const tasksUiReducer = handleActions(tasksUiStateHandlers, tasksUiState);

export default combineReducers({
  text: textReducer,
  tasks: tasksReducer,
  tasksUiState: tasksUiReducer,
});
