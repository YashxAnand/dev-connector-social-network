import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileAction";
import PropTypes from "prop-types";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{" "}
          {edu.to ? <Moment format='YYYY/MM/DD'>{edu.to}</Moment> : "Till Date"}
        </td>
        <td>
          <div
            className='btn btn-danger'
            onClick={this.onDeleteClick.bind(this, edu._id)}
          >
            Delete
          </div>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className='mb-4'>Educations</h4>
        <table className='table'>
          <thead>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th></th>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
