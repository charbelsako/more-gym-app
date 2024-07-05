import React from 'react';
import { SocialIcon } from 'react-social-icons';

function ContactUs() {
  return (
    <div className='container mt-5'>
      <h1 className='text-center mb-4'>Contact Us</h1>

      <div className='row'>
        <div className='col-md-6'>
          <h2>Get in Touch</h2>
          <p>If you have any questions, feel free to reach out to us:</p>
          <p>
            <strong>Phone:</strong> <a href='tel:+96170868068'>70 868 068</a>
          </p>
          {/* <p>
            <strong>Email:</strong>{' '}
            <a href='mailto:info@example.com'>info@example.com</a>
          </p> */}
        </div>

        <div className='col-md-6'>
          <h2>Follow Us on Instagram</h2>
          <div className=''>
            <a
              href='https://www.instagram.com/yourprofile'
              target='_blank'
              rel='noopener noreferrer'
              className=''
            >
              <SocialIcon url={'https://instagram.com/charbel.m.sarkis'} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
