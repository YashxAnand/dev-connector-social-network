import React, { Component } from "react";
import { addComment } from "../../actions/postAction";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import PropTypes from "prop-types";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
    };

    this.props.addComment(newComment, postId);
    this.setState({ text: "" });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className='post-form mb-3'>
        <div className='card card-info'>
          <div className='card-header bg-info text-white'>
            Make a comment...
          </div>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <TextAreaFieldGroup
                  name='text'
                  value={this.state.text}
                  onChange={this.onChange}
                  placeholder='Reply to the post'
                  errors={errors.text}
                />
              </div>
              <button type='submit' className='btn btn-dark'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  post: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, { addComment })(CommentForm);
