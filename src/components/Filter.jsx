import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const filters = [
  ['all', 'All Tasks'],
  ['active', 'Active Tasks'],
  ['finished', 'Finished Tasks'],
];

const mapStateToProps = (state) => {
  const props = {
    currentFilterName: state.tasks.currentFilterName,
  };
  return props;
};

const actionCreators = {
  setTaskFilter: actions.setTasksFilter,
};

const Filter = ({ currentFilterName, setTaskFilter }) => {
  const handleCurrentTaskFilter = (filterName) => (e) => {
    e.preventDefault();
    setTaskFilter({ filterName });
  };

  const checkCurrentFilter = (filter) => {
    const [tag, title] = filter;
    if (tag === currentFilterName) {
      return <button key={tag} type="button" className="btn btn-primary btn-sm" disabled>{title}</button>;
    }
    return <button key={tag} type="button" className="btn btn-outline-primary btn-sm" onClick={handleCurrentTaskFilter(tag)}>{title}</button>;
  };

  return (
    <div className="mt-3 d-flex justify-content-around">
      {filters.map(checkCurrentFilter)}
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Filter);
