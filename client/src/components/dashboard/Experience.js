import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileAction";
import PropTypes from "prop-types";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{" "}
          {exp.to ? <Moment format='YYYY/MM/DD'>{exp.to}</Moment> : "Till Date"}
        </td>
        <td>
          <div
            className='btn btn-danger'
            onClick={this.onDeleteClick.bind(this, exp._id)}
          >
            Delete
          </div>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className='mb-4'>Experiences</h4>
        <table className='table'>
          <thead>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th></th>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
