import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const removeTask = createAction('TASK_REMOVE');
export const toggleTaskState = createAction('TASK_STATE_TOGGLE');
export const toggleTaskTheme = createAction('TASK_THEME_TOGGLE');
export const setTasksFilter = createAction('TASK_FILTER_SET');
