import { createSelector } from 'reselect';

const getTasks = (state) => state.tasks;

// eslint-disable-next-line import/prefer-default-export
export const tasksSelector = createSelector(
  getTasks,
  (tasks) => {
    const { byId, allIds } = tasks;
    return allIds.map((id) => byId[id]);
  },
);
