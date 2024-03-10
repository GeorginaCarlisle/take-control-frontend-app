import React, { useState } from 'react';
import pageStyles from '../../styles/Page.module.css';
import btnStyles from '../../styles/Button.module.css';
import formStyles from '../../styles/Form.module.css';
import logo from '../../assets/purple-logo.png';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

const Signup = () => {

  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: ''
  });

  const { username, password1, password2 } = signUpData;

  const history = useHistory();

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/dj-rest-auth/registration/', signUpData);
      history.push('/signin');
    } catch(err){
      setErrors(err.response?.data);
    }
  };

  return (
    <div className={pageStyles.PageContainer}>
      <div className={pageStyles.TitleContainer}>
        <div className={pageStyles.Title}>
          <img
            src={logo}
            alt="Take control logo. A green decagon made of intersecting lines"
            className={pageStyles.Logo}
          />
          <h1>Get signed up!</h1>
        </div>
      </div>
      <div className={`${pageStyles.ContentContainer} ${formStyles.FormContainer}`}>
        <Form onSubmit={handleSubmit}>

          {errors.username?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="username" className={formStyles.FormGroup}>
            <Form.Label className={formStyles.FormLabel}>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Group>

          {errors.password1?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="password1" className={formStyles.FormGroup}>
            <Form.Label className={formStyles.FormLabel}>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password1"
              value={password1}
              onChange={handleChange}
            />
          </Form.Group>

          {errors.password2?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="password2" className={`${formStyles.FormGroup} ${formStyles.FinalGroup}`}>
            <Form.Label className={formStyles.FormLabel}>Confirm password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
          </Form.Group>

          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Button className={`${btnStyles.Button} ${formStyles.SubmitButton}`} type="submit">
            Sign up
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Signup