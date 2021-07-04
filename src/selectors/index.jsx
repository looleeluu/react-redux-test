import { createSelector } from 'reselect';

const getTasks = (state) => state.tasks;

const getCurrentFilterName = createSelector(
  getTasks,
  (tasks) => tasks.currentFilterName,
);

const tasksSelector = createSelector(
  getTasks,
  (tasks) => {
    const { byId, allIds } = tasks;
    return allIds.map((id) => byId[id]);
  },
);
// eslint-disable-next-line import/prefer-default-export
export const filteredTasksSelector = createSelector(
  getCurrentFilterName,
  tasksSelector,
  (filterName, tasks) => {
    if (filterName === 'all') {
      return tasks;
    }
    return tasks.filter((t) => t.state === filterName);
  },
);
