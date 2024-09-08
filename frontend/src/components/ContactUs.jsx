import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_5hhrznt', 'template_idzpf7c', form.current, {
        publicKey: 'FwvZEVlea4HPO05pm',
      })
      .then(
        (res) => {
            toast.success("Mail sent!")
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );


  };

  return (
    <form ref={form} onSubmit={sendEmail} className='d-flex flex-column h-100 w-100 justify-content-center align-items-center mt-5'>
      <label>Name</label>
      <input type="text" name="user_name" className='w-50 p-4'/>
      <label>Email</label>
      <input type="email" name="user_email" className='w-50 p-4'/>
      <label>Company1</label>
      <input type="text" name="company1" className='w-50 p-4'/>
      <label>Company2</label>
      <input type="text" name="company2" className='w-50 p-4'/>
      <label>Message</label>
      <textarea name="message" className='w-50 p-4'/>
      <input type="submit" value="Send mail"  className='w-25 m-5 bg-dark text-light p-3 border-1 rounded-4' />
    </form>
  );
};