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
import { useSetCurrentUser } from '../../api/contexts/CurrentUserContext';

function SignIn() {

  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = signInData;

  const history = useHistory();

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post('/dj-rest-auth/login/', signInData);
      setCurrentUser(data.user);
      history.push('/');
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
          <h1>Sign in to your account</h1>
        </div>
      </div>
      <div className={`${pageStyles.ContentContainer} ${formStyles.FormContainer}`}>
        <Form onSubmit={handleSubmit}>
          {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} className={formStyles.ErrorAlert}>
                {message}
              </Alert>
            ))}

          {errors.username?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="username" className={formStyles.FormGroup}>
            <Form.Label className={formStyles.FormLabel}>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Group>

          {errors.password?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="password" className={`${formStyles.FormGroup} ${formStyles.FinalGroup}`}>
            <Form.Label className={formStyles.FormLabel}>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button className={`${btnStyles.Button} ${formStyles.SubmitButton}`} type="submit">
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SignIn;