import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions/actions';

const mapStateToProps = () => {
  const props = {};
  return props;
};

const actionCreators = {
  addTask: actions.addTask,
};

const NewTaskForm = ({ addTask, reset, handleSubmit }) => {
  const onSubmit = (values) => {
    const task = { ...values, id: _.uniqueId(), state: 'active' };
    addTask({ task });
    reset();
  };

  return (
    <form action="" className="d-flex justify-content-md-center" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mx-sm-3 col-5">
        <Field className="form-control" name="text" required component="input" type="text" placeholder="Enter your task..." />
      </div>
      <input type="submit" className="btn btn-primary" value="Add Task" />
    </form>
  );
};

const connectedNewTaskForm = connect(mapStateToProps, actionCreators)(NewTaskForm);
export default reduxForm({
  form: 'newTask',
})(connectedNewTaskForm);
