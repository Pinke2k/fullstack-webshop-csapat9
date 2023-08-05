import React, { useRef } from "react";
import styled from "styled-components";
import "./Contact.css"


const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

  };

  

  return (
    <>
    <h1>Kapcsolat</h1>
    <div className="kapcsolat-p">
      <div className="contact-form">
        <StyledContactForm>
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
          </form>
        </StyledContactForm>
        </div>
        <div className="map"><iframe width="450" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=500&amp;height=400&amp;hl=en&amp;q=Margit%20h%C3%ADd+(My%20Business%20Name)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population mapping</a></iframe>
      </div>
    </div>
    </>
  );
};

export default Contact;

const StyledContactForm = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;

  form {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    font-size: 1rem;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid #cecb00cd;
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid #cecb00cd;
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
    input[type="submit"]:hover{
      background-color: #cecb00cd;
    }
  }
`;