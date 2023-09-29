import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import classes from './contact-form.module.css';
import Notification from '../ui/notification';

function ContactForm() {
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const messageInputRef = useRef();

  const [requestStatus, setRequestStatus] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (!requestStatus || requestStatus === 'pending') return;

    const timer = setTimeout(() => {
      setRequestStatus(null);
      setErrorMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [requestStatus]);

  function resetInputFields() {
    emailInputRef.current.value = '';
    nameInputRef.current.value = '';
    messageInputRef.current.value = '';
  }

  async function sendMessageHandler(e) {
    e.preventDefault();

    const apiUrl = `/api/contact`;

    const email = emailInputRef.current.value;
    const name = nameInputRef.current.value;
    const message = messageInputRef.current.value;

    setRequestStatus('pending');

    try {
      await axios.post(apiUrl, {
        email,
        name,
        message,
      });
      setRequestStatus('success');
      resetInputFields();
    } catch (err) {
      setRequestStatus('error');
      setErrorMessage(err.message);
      return;
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message',
      message: "Your message is on it's way",
    };
  }
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully',
    };
  }
  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error',
      message: errorMessage,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form onSubmit={sendMessageHandler} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input ref={emailInputRef} type="email" id="email" required />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input ref={nameInputRef} type="text" id="name" required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            ref={messageInputRef}
            id="message"
            rows={5}
            required
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
