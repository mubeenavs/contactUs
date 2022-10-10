import React, { useState } from 'react';
import { Call, Sms } from 'iconsax-react';
import { Form, Container,Modal, Button } from 'react-bootstrap'
import { SVGIcons } from '../../themes/components/SVGIcons';
import CustomInput from '../../themes/components/CustomInput';
import useSupportService from './services/supportService';
import axios from 'axios';
import Image from 'next/image';
import verifyImg from '../../themes/images/verify.svg';
import alert from '../../themes/images/alert.svg';


export default function ContactUs() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [ResetConfirmshow, setResetConfirmShow] = useState(false);
  const ResetConfirmhandleClose = () => setResetConfirmShow(false);
  const ResetConfirmhandleShow = () => setResetConfirmShow(true);
  const[ErrorConfirmShow,setErrorConfirmShow]=useState(false);
  const ErrorConfirmhandleClose = () => setErrorConfirmShow(false);
  const ErrorConfirmhandleShow = () => setErrorConfirmShow(true);


  // const supportService = useSupportService();
  const props= {
    email: email,
    phone: phone,
    address: address,
    comment: comment,
  };
  const sendContactDetails = () => {
    axios
            .post('https://peg.techfriar.xyz/api/send_enquiry', props)
            .then(() =>{
              ResetConfirmhandleShow();
            })
            .catch(error => {
              console.log(error.response.data.error)
              ErrorConfirmhandleShow();
            })
    // supportService
    //   .sendContactDetailsForEnquiry(email, phone, address, comment).then((response) => {
    //     console.log(response);
    //     if(response.status==true){
    //       ResetConfirmhandleShow();
    //     }
    //   });
  };

  return (
    <>
      <section className="contact-us">
        <Container>
          <div className="section-header d-align-center flex-column">
            <p className="title fw-medium">Contact Us</p>
            <h5 className="sub-title text-center mt-3">
              Any question or remarks? Just write us a message!
            </h5>
          </div>
          <div className="d-flex flex-wrap line-gray mt-4 mt-sm-5 flex-lg-row flex-column-reverse">
            <div className="contact-info d-flex contact-us-pd flex-column">
              <div className="head-text fw-medium ">
                <h3 className="fw-medium">Contact Information</h3>
              </div>
              <p className="fw-extra-small">
                Fill up the form above and our team will connect with you in
                less than 24 hours
              </p>
              <div className="contact-detail-wrap">
                <a 
                  href="Tel:+91 12345 67890"
                  className="d-align-center contact-detail"
                >
                  <Call className="Contact-icons" />
                  <p className="fw-extra-small">+91 12345 67890</p>
                </a>
                <a
                  href="mailto:info@peg.live"
                  className="d-align-center contact-detail"
                >
                  <Sms className="Contact-icons" />
                  <p className="fw-extra-small">info@peg.live</p>
                </a>
              </div>
              <div className="social-icons d-flex justify-content-between justify-content-sm-start mt-auto">
                <a href="#">{SVGIcons.Facebook}</a>
                <a href="#">{SVGIcons.Instagram}</a>
                <a href="#">{SVGIcons.Linkedin}</a>
                <a href="#">{SVGIcons.Twitter}</a>
              </div>
            </div>
            <div className="contact-form position-relative ">
              <Form method="post" className="h-100 contact-us-pd">
                <div className="right-box">
                  <div className="form-group d-flex flex-column flex-lg-row w-100">
                    <CustomInput
                      ID=""
                      labelText="Email ID"
                      placeholder="Email ID"
                      type="email"
                      customClass="form-input-medium-bottom-space"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}                   
                    />
                    <CustomInput
                      ID=""
                      labelText="Phone Number"
                      placeholder="Phone Number"
                      type="number"
                      customClass="form-input-medium-bottom-space"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>
                  <CustomInput
                    ID=""
                    labelText="Address"
                    placeholder="Address"
                    type="text"
                    customClass="form-input-medium-bottom-space"
                    value={address}
                      onChange={(event) => setAddress(event.target.value)}
                  />
                  <CustomInput
                    ID=""
                    labelText="Add Your Notes"
                    placeholder="Add Your Notes"
                    type="text"
                    customClass="form-input-medium-bottom-space"
                    value={comment}
                      onChange={(event) => setComment(event.target.value)}
                  />

                  <div className="d-center pt-3 pt-lg-0">
                    <Button
                      variant="none"
                      className="custom-btn text-white m-auto"
                      onClick={() => sendContactDetails()}
                    >
                      <span className="custom-btn-inner">Send</span>
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Container>
      </section>
      <Modal
        show={ResetConfirmshow}
        onHide={ResetConfirmhandleClose}
        backdrop="static"
        keyboard={false}
        centered
        className="popup-modal-sm peg-modal"
      >
        <Modal.Header closeButton> </Modal.Header>
        <Modal.Body>
          <div className="d-center text-center flex-column">
            <div className="confirmation-img">
              <Image
                src={verifyImg}
                alt="confirmationimg"
                className="image-box contain-img"
              />
            </div>
            <p className="success-text fw-small">
              Thank You for submitting <br /> your query.
            </p>
            <p className="success-tagline">
              We have received your request. Someone from our team will get in
              touch with you shortly.
            </p>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
      show={ErrorConfirmShow}
      onHide={ErrorConfirmhandleClose}
        backdrop="static"
        keyboard={false}
        centered
        className="popup-modal-sm peg-modal">
       <Modal.Header closeButton> </Modal.Header>
        <Modal.Body>
          <div className="d-center text-center flex-column">
            <div className="confirmation-img">
              <Image
                src={alert}
                alt="confirmationimg"
                className="image-box contain-img"
              />
            </div>
            <p className="success-text fw-small">
            Failed <br /> your query.
            </p>
            <p className="success-tagline">
              Please Fill all field properly!!
            </p>
          </div>
        </Modal.Body>  
      </Modal>
    </>
  );
}


