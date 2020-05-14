import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../../actions/postAction";
import PropTypes from "prop-types";
import Spinner from "../../common/spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import { Link } from "react-router-dom";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;

    let postContent;
    if (post === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed comments={post.comments} postId={post._id} />
        </div>
      );
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <Link to='/feed' className='btn btn-light mb-2'>
              Go Back
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
