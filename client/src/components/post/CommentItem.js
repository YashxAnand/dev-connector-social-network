import React, { Component } from "react";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postAction";
import { connect } from "react-redux";

class CommentItem extends Component {
  onClickDelete(id, postId) {
    this.props.deleteComment(id, postId);
  }

  render() {
    const { auth, comment, postId } = this.props;

    return (
      <div className='card card-body mb-3'>
        {comment && (
          <div className='row'>
            <div className='col-md-2'>
              <a href='profile.html'>
                <img
                  className='rounded-circle d-none d-md-block'
                  src={comment.avatar}
                  alt=''
                />
              </a>
              <br />
              <p className='text-center'>{comment.name}</p>
            </div>
            <div className='col-md-10'>
              <p className='lead'>{comment.text}</p>
            </div>
            {auth.user.id === comment.user && (
              <button
                type='button'
                className='btn btn-danger mr-1'
                onClick={this.onClickDelete.bind(this, comment._id, postId)}
              >
                <i className='fas fa-times' />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
