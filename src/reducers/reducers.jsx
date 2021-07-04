import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions/actions';

// TASKS REDUCERS MOUNTING
const tasksState = {
  byId: {},
  allIds: [],
  currentFilterName: 'all',
};

const addTaskHandler = (state, { payload: { task } }) => {
  const { byId, allIds } = state;
  return {
    ...state,
    byId: { ...byId, [task.id]: task },
    allIds: [task.id, ...allIds],
  };
};

const removeTaskHandler = (state, { payload: { id } }) => {
  const { byId, allIds } = state;
  return {
    ...state,
    byId: _.omit(byId, id),
    allIds: _.without(allIds, id),
  };
};

const toggleTaskStateHandler = (state, { payload: { id } }) => {
  const { byId, allIds, currentFilterName } = state;
  const newTaskState = byId[id].state === 'active' ? 'finished' : 'active';
  return {
    byId: { ...byId, [id]: { ...byId[id], state: newTaskState } },
    allIds: [...allIds],
    currentFilterName,
  };
};

const toggleTaskBoxFilter = (state, { payload: { filterName } }) => ({
  ...state,
  currentFilterName: filterName,
});

const tasksHandlers = {
  [actions.addTask]: addTaskHandler,
  [actions.removeTask]: removeTaskHandler,
  [actions.toggleTaskState]: toggleTaskStateHandler,
  [actions.setTasksFilter]: toggleTaskBoxFilter,
};

const tasksReducer = handleActions(tasksHandlers, tasksState);

// TASKS UI STATE MOUNTING
const tasksUiState = {};

const addTaskUiStateHandler = (state, { payload: { task } }) => ({
  ...state,
  [task.id]: { theme: 'light' },
});

const removeTaskUiStateHandler = (state, { payload: { id } }) => _.omit(state, id);

const toggleTaskThemeHandler = (state, { payload: { id } }) => {
  const newTheme = state[id].theme === 'light' ? 'primary' : 'light';
  return {
    ...state,
    [id]: { theme: newTheme },
  };
};

const tasksUiStateHandlers = {
  [actions.addTask]: addTaskUiStateHandler,
  [actions.removeTask]: removeTaskUiStateHandler,
  [actions.toggleTaskTheme]: toggleTaskThemeHandler,
};

const tasksUiReducer = handleActions(tasksUiStateHandlers, tasksUiState);

export default combineReducers({
  tasks: tasksReducer,
  tasksUiState: tasksUiReducer,
  form: formReducer,
});
