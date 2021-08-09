import { useState, useEffect, useRef } from 'react';
import { Rating } from '@material-ui/lab';
import moment from 'moment';
import * as Icon from 'react-feather';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextarea from '../../../common/CustomTextarea';
import axiosInstance from '../../../utils/axios';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import Modal from '../../../common/Modal';
import { useModal } from '../../../hook';
import { useHistory } from 'react-router';
const ReviewProduct = ({ id, socket }) => {
  const [rating, setRating] = useState(2);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [textReply, setTextReply] = useState('');
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();
  const [showFromReview, setShowFromReview] = useState(true);
  const [showBoxReply, setShowBoxRepl] = useState('');

  const [page, setPage] = useState(1);
  const pageEnd = useRef();
  const history = useHistory();

  const auth = useSelector(state => state.auth);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/review/${id}?limit=${page * 3}`).then(res => {
      setReviews(r => (r = res.data.reviews));
      setLoading(false);
    });
  }, [id, page]);
  useEffect(() => {
    if (auth.user) {
      axiosInstance
        .get(`/review/check_review/${id}/${auth.user._id}`, {
          withCredentials: true,
          crossorigin: true
        })
        .then(res => {
          if (res.data.length) {
            setShowFromReview(false);
          }
        });
    }
  }, [id]);

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', id);

      socket.on('clients-total', data => {
        console.log('clients-total:', data);
      });
      return () => {
        socket.emit('leaveRoom', id);
      };
    }
  }, [socket, id]);

  useEffect(() => {
    if (socket) {
      socket.on('sendReviewToClient', newReview => {
        setReviews([newReview, ...reviews]);
        console.log(reviews);
      });

      return () => socket.off('sendReviewToClient');
    }
  }, [reviews]);

  useEffect(() => {
    if (socket) {
      socket.on('sendReplyReviewToClient', review => {
        const temp = [...reviews];
        temp.forEach(value => {
          if (value._id === review._id) {
            value.reply = JSON.parse(JSON.stringify(review.reply));
          }
        });

        setReviews(temp);
      });

      return () => socket.off('sendReplyReviewToClient');
    }
  }, [reviews]);

  useEffect(() => {
    if (socket) {
      socket.on('sendLikeReview', review => {
        console.log('sendLikeReview');

        const temp = [...reviews];
        temp.forEach(value => {
          if (value._id === review._id) {
            value.likes = JSON.parse(JSON.stringify(review.likes));
          }
        });

        setReviews(temp);
      });

      return () => socket.off('sendLikeReview');
    }
  }, [reviews]);

  useEffect(() => {
    if (socket) {
      socket.on('sendUnLikeReview', review => {
        console.log('sendUnLikeReview');
        console.log(review);
        const temp = [...reviews];
        temp.forEach(value => {
          if (value._id === review._id) {
            value.likes = JSON.parse(JSON.stringify(review.likes));
          }
        });

        setReviews(temp);
      });

      return () => socket.off('sendUnLikeReview');
    }
  }, [reviews]);

  useEffect(() => {
    if (socket) {
      socket.on('sendDeleteReply', review => {
        console.log('sendDeleteReply');
        console.log(review);
        const temp = [...reviews];
        temp.forEach(value => {
          if (value._id === review._id) {
            value.reply = JSON.parse(JSON.stringify(review.reply));
          }
        });

        setReviews(temp);
      });

      return () => socket.off('sendDeleteReply');
    }
  }, [reviews]);

  const onBoxReply = review_id => {
    setShowBoxRepl(review_id);
  };
  const onBoxReplyHide = () => {
    setShowBoxRepl('');
    setTextReply('');
  };

  // infiniti scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      {
        threshold: 0.1
      }
    );

    observer.observe(pageEnd.current);
  }, []);

  const textAutoSize = (element, defaultHeight) => {
    if (element) {
      const target = element.target ? element.target : element;
      target.style.height = defaultHeight;
      setTextReply(element.target.value);
      if (target.scrollHeight <= 109) {
        target.style.height = `${target.scrollHeight}px`;
        target.style.overflow = 'hidden';
      } else {
        target.style.height = `109px`;
        target.style.overflow = 'auto';
      }
    }
  };
  const FormSchema = Yup.object().shape({
    content: Yup.string()
      .min(4, 'The cotent min 4 character.')
      .required('Content is required.')
  });
  const likeReview = (review_id, likes) => {
    if (!auth.user) {
      onOpenModal();
    } else {
      const data = {
        review_id: review_id,
        user_id: auth.user._id,
        product_id: id
      };
      if (socket) {
        socket.emit('likeReview', {
          data,
          type: likes.includes(auth.user._id) ? 'UnLike' : 'Like'
        });
      }
      setReviews([...reviews]);
    }
  };

  const deleteReply = (review_id, reply_id) => {
    let data = {
      review_id: review_id,
      reply_id: reply_id,
      product_id: id
    };
    if (socket) {
      socket.emit('deleteReply', {
        data
      });
    }
    // setReviews([...reviews]);
  };
  const onSendReply = review_id => {
    if (!auth.user) {
      onOpenModal();
    } else {
      let data = {
        review_id: review_id,
        replyBy: get(auth, 'user._id', ''),
        text: textReply,
        product_id: id
      };
      console.log(data);
      if (socket) {
        socket.emit('createReview', {
          data,
          type: 'createReplyReview'
        });
      }
    }
    setReviews([...reviews]);
  };

  const onFormSubmit = form => {
    if (!auth.user) {
      onOpenModal();
    } else {
      console.log('else');
      let data = {
        content: form.content,
        rating: rating,
        product_id: id,
        postedBy: auth.user._id
      };
      if (socket) {
        socket.emit('createReview', {
          data,
          type: 'createReview'
        });
      }
      setReviews([...reviews]);
    }

    // axiosInstance
    //   .post('/review', {
    //     content: form.content,
    //     rating: rating,
    //     product_id: id,
    //     postedBy: postedBy.user._id
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //   });
  };

  return (
    <>
      <Modal isOpen={isOpenModal} onRequestClose={onCloseModal}>
        <p className='text-center'>
          You must sign in to continue writing reviews
        </p>
        <br />
        <div className='d-flex-center'>
          <button
            className='button button-border button-border-gray btn-modal-review'
            onClick={onCloseModal}
            type='button'
          >
            Continue shopping
          </button>
          &nbsp; &nbsp;
          <button
            className='button btn-modal-review'
            onClick={() => history.push('/login')}
            type='button'
          >
            Sign in to write a review
          </button>
        </div>
      </Modal>
      <div className='review'>
        <h2 className='app_title'>Review</h2>
        <div className='info-user'>
          <img
            className='avatar'
            src={get(
              auth,
              'user.profile.avatar',
              'https://res.cloudinary.com/dbdb4punq/image/upload/v1619375333/test/depositphotos_309156466-stock-illustration-male-face-avatars-man-silhouette_ekgi4z.jpg'
            )}
            alt='No avartar'
          />
          <div className='username'>
            {get(auth, 'user.profile.name', `User`)}
          </div>
        </div>

        <div className='ratings'>
          <Rating
            name='controlled'
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </div>
        <Formik
          initialValues={{
            content: ''
          }}
          enableReinitialize
          validateOnChange
          validationSchema={FormSchema}
          onSubmit={onFormSubmit}
        >
          <Form>
            <Field
              name='content'
              id='content'
              label='* Content Review'
              component={CustomTextarea}
            />
            <button className='button btn-send' type='submit'>
              Send
            </button>
          </Form>
        </Formik>
        <div className='review-list'>
          {reviews.length &&
            reviews.map((value, key) => {
              return (
                <div className='review-card' key={key}>
                  <div className='info-user'>
                    <img
                      className='avatar'
                      src={get(value, 'postedBy.profile.avatar', '')}
                      alt='No avartar'
                    />
                    <div className='username'>
                      {get(value, 'postedBy.profile.name', '')}
                    </div>
                  </div>
                  <span className='review-time'>
                    {moment(value.createdAt).fromNow()}
                  </span>
                  <span className='review-time'>
                    {new Date(value.createdAt).toLocaleString()}
                  </span>
                  <div className='ratings'>
                    <Rating name='read-only' value={value.rating} readOnly />
                  </div>
                  <p>{value.content}</p>
                  <div className='nav_review'>
                    <Icon.ThumbsUp
                      className={`${
                        value.likes.includes(get(auth, 'user._id', ''))
                          ? 'liked'
                          : ''
                      }`}
                      onClick={() => likeReview(value._id, value.likes)}
                    />
                    {value.likes.length && <span>{value.likes.length}</span>}

                    <div
                      className='reply'
                      onClick={() => onBoxReply(value._id)}
                    >
                      Reply
                    </div>
                    <div className='reply' onClick={onBoxReplyHide}>
                      Hide Repley
                    </div>
                  </div>
                  {value._id === showBoxReply && (
                    <div className='d-flex justify-around'>
                      <textarea
                        value={textReply}
                        name={'test'}
                        id={'test'}
                        className={`reply-text`}
                        onChange={event => textAutoSize(event, '35px')}
                      />
                      <button
                        className='button btn-reply'
                        onClick={() => onSendReply(value._id)}
                      >
                        Send
                      </button>
                    </div>
                  )}
                  {value.reply.map((reply, i) => {
                    console.log(reply);
                    return (
                      <div className='reply_review' key={i}>
                        <div className='info-user'>
                          <img
                            className='avatar'
                            src={
                              value.reply[value.reply.length - 1 - i].replyBy
                                .profile.avatar
                            }
                            alt='No avartar'
                          />
                          <div className='username'>
                            {
                              value.reply[value.reply.length - 1 - i].replyBy
                                .profile.name
                            }
                          </div>
                        </div>
                        <span className='review-time'>
                          {moment(
                            value.reply[value.reply.length - 1 - i].created
                          ).fromNow()}
                        </span>
                        <span className='review-time'>
                          {new Date(
                            value.reply[value.reply.length - 1 - i].created
                          ).toLocaleString()}
                        </span>
                        <p>{value.reply[value.reply.length - 1 - i].text}</p>
                        {get(auth, 'user._id', '') == value.postedBy._id && (
                          <Icon.Trash2
                            className='delete-reply'
                            onClick={() =>
                              deleteReply(
                                value._id,
                                value.reply[value.reply.length - 1 - i]._id
                              )
                            }
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>

        {loading && (
          <div className='loading'>
            <img
              src={`https://res.cloudinary.com/dbdb4punq/image/upload/v1624197818/test/Spinner-1s-200px_hkysr0.gif`}
              alt=''
            />
          </div>
        )}
        <button ref={pageEnd} style={{ opacity: 0 }}>
          Load more
        </button>
        <ToastContainer />
      </div>
    </>
  );
};
export default ReviewProduct;
