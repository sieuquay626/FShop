import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { forgot_password_api } from '../../../api/auth';
const ForgotPassword = () => {
  const [isSendingForgotPWRequest, setIsSending] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const typingTimeoutRef = useRef(null);
  const validateEmail = email => {
    const re =
      '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/';
    return re.test(String(email).toLowerCase());
  };
  //debounce
  const onEmailChange = e => {
    const value = e.target.value;
    setEmail(value);
    value || setError('Email is required');

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      console.log(validateEmail(value));
      validateEmail(value) ? setError('') : setError('Email is not valid');
    }, 1000);
  };

  const onSubmitEmail = () => {
    if (!!email) {
      setIsSending(true);
      forgot_password_api({ email })
        .then(res => {
          console.log(res);
          toast.success('Sending email success');
        })
        .catch(err => {
          toast.error(err.response.data.msg);
        });
    }
  };

  return (
    <div className='content'>
      <div className='forgot_password'>
        <h3>Forgot Your Password?</h3>
        <p>
          Enter your email address and we will send you a password reset email.
        </p>
        <br />
        <div className='input-group'>
          {error ? (
            <span className='label-input label-error'>{error}</span>
          ) : (
            <label className='label-input' htmlFor={`email`}>
              * Email
            </label>
          )}
        </div>
        <input
          name='email'
          required
          className={`input-form ${error && `input-error`}`}
          value={email}
          onChange={e => onEmailChange(e)}
          placeholder='Enter your email'
          readOnly={isSendingForgotPWRequest}
          type='text'
          style={{ width: '100%' }}
        />
        <br />
        <br />
        <button
          className='button w-100-mobile'
          disabled={isSendingForgotPWRequest}
          onClick={onSubmitEmail}
          type='button'
        >
          {isSendingForgotPWRequest ? <LoadingOutlined /> : <CheckOutlined />}
          &nbsp;
          {isSendingForgotPWRequest
            ? 'Sending Password Reset Email'
            : 'Send Password Reset Email'}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
