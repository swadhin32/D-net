import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'

const PostItem = ({ addLike, removeLike, deletePost, auth, post: { _id, text, name, avatar, user, likes, comments, date}}) => {
  return (
    <div class="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile`}>
        <img
          class="round-img"
          src={avatar}
          alt=""
        />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p class="my-1">
        {text}
      </p>
       <p class="post-date">
          Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
      </p>
      <button type="button" class="btn btn-light" onClick={() => addLike(_id)}>
        <i class="fas fa-thumbs-up"></i>
        <span>{' '} {likes.length > 0 ? <span>{likes.length}</span> : null}</span>
      </button>
      <button type="button" class="btn btn-light" onClick={() => removeLike(_id)}>
        <i class="fas fa-thumbs-down"></i>
      </button>
      <Link to={`/post/${_id}`} class="btn btn-primary">
        Discussion{' '} {comments.length > 0 && (
                <span class='comment-count'>{comments.length}</span>
            )}
      </Link>
      {!auth.loading && user===auth.user._id && (
        <button type='button' className='btn btn-danger' onClick={e => deletePost(_id)}>
            <i className='fas fa-times' />
        </button>
      )}
    </div>
  </div>
  )
}

PostItem.propTypes = {
    posts: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)