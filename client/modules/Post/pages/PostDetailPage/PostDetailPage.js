import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl, FormattedMessage } from 'react-intl';


// Import Style

import styles from './PostDetailPage.css';


// Import Actions
import { toggleEditPost } from '../../../App/AppActions';
import { getShowEditPost } from '../../../App/AppReducer';
import { fetchPost, editPostRequest, thumbUpCommentRequest, thumbsDownRequest } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';

export class PostDetailPage extends Component {
  state = {
    name: this.props.post.name,
    title: this.props.post.title,
    content: this.props.post.content,
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleEditPost = () => {
    this.props.toggleEditPost();
    this.props.editPostRequest(this.state);
  };

  renderPostForm = () => {
    return (
      <div className={styles['form-content']}>
        <h2 className={styles['form-title']}><FormattedMessage id="editPost" /></h2>
        <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} name="name" value={this.state.name} onChange={this.handleInputChange}/>
        <input placeholder={this.props.intl.messages.postTitle} className={styles['form-field']} name="title" value={this.state.title} onChange={this.handleInputChange}/>
        <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} name="content" value={this.state.content} onChange={this.handleInputChange}/>
        <a className={styles['post-submit-button']} href="#" onClick={this.handleEditPost}><FormattedMessage id="submit" /></a>
      </div>
    );
  };

  renderPost = () => {
    return (
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
        <h3 className={styles['post-title']}>{this.props.post.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
        <p className={styles['post-desc']}>{this.props.post.content}</p>
        <p><span>votes: {this.props.post['__v']}</span></p>
        <button className={styles['button']} onClick={() => this.props.thumbUpCommentRequest(this.props.post.votes)}>+</button>
        <button className={styles['button']} onClick={() => this.props.thumbsDownRequest(this.props.post.votes)}>-</button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <a className={styles['edit-post-button']} href="#" onClick={this.props.toggleEditPost}><FormattedMessage id="editPost" /></a>
        {
          this.props.showEditPost
            ? this.renderPostForm()
            : this.renderPost()
        }
      </div>
    );
  }

}

// Actions required to provide data for this component to render in sever side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

function mapDispatchToProps(dispatch, props) {
  return {
    toggleEditPost: () => dispatch(toggleEditPost()),
    editPostRequest: (post) => dispatch(editPostRequest(props.params.cuid, post)),
    thumbUpCommentRequest: (votes) => dispatch(thumbUpCommentRequest(props.params.cuid)),
    thumbsDownRequest: (votes) => dispatch(thumbsDownRequest(props.params.cuid)),
  }
}

function mapStateToProps(state, props) {
  console.log(getPost(state, props.params.cuid))
  return {
    post: getPost(state, props.params.cuid),
    showEditPost: getShowEditPost(state)
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PostDetailPage));
