import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import btnStyles from '../../styles/Button.module.css';
import formStyles from '../../styles/Form.module.css';
import styles from '../../styles/FocusView.module.css';
import { Alert, Button, Form, Image } from 'react-bootstrap';

const FocusEdit = (props) => {
  const {
    id,
    name,
    why,
    image,
    setFocusState,
    setFocusData
  } = props;

  const [newData, setNewData] = useState({
    newName: name,
    newWhy: why,
    newImage: image,
  });

  const { newName, newWhy, newImage } = newData;

  const [errors, setErrors] = useState({});

  const imageInput = useRef(null);

  const handleChange = (event) => {
    setNewData({
      ...newData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length > 0){
      URL.revokeObjectURL(image);
      setNewData({
        ...newData,
        newImage: URL.createObjectURL(event.target.files[0])
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(id)
    const formData = new FormData();
    formData.append('name', newName)
    formData.append('why', newWhy)
    if (imageInput.current.files.length > 0) {
      formData.append('image', imageInput.current.files[0]);
    }
    try {
      const {data} = await axiosReq.put(`/focus/${id}`, formData);
      setFocusData(data);
      setFocusState('view');
    } catch(err){
      if (err.response?.status !== 401){
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles.FocusForm}>

        <Form.Group className={styles.ImageGroup}>
          {errors.image?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Image src={newImage} className={styles.EditImage}/>
          <Form.File
            id="image-upload"
            accept="image/*"
            className={styles.FormFile}
            onChange={handleChangeImage}
            ref={imageInput}
            aria-label='Click to change the focus image'
          />
        </Form.Group>
        <div className={styles.FormSection}>
          <div className={styles.MainForm}>

            <div>
              <div className={styles.ErrorContainer}>
                {errors.name?.map((message, idx) => (
                  <Alert key={idx} className={formStyles.ErrorAlert}>
                    {message}
                  </Alert>
                ))}
              </div>
              <Form.Group controlId="newName" className={styles.Group}>
                <Form.Label className={styles.FormLabel}>Focus:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Give your focus area a name"
                  name="newName"
                  value={newName}
                  onChange={handleChange}
                  className={styles.ShortInput}
                />
              </Form.Group>
            </div>

            <div>
              <div className={styles.ErrorContainer}>
                {errors.why?.map((message, idx) => (
                  <Alert key={idx} className={formStyles.ErrorAlert}>
                    {message}
                  </Alert>
                ))}
              </div>
              <Form.Group controlId="newWhy" className={styles.Group}>
                <Form.Label className={styles.FormLabel}>Why:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Why is this area important to you? Why do you want to focus on it?"
                  name="newWhy"
                  value={newWhy}
                  onChange={handleChange}
                  className={styles.LongInput}
                />
              </Form.Group>
            </div>
          </div>
      
          <div className={styles.ButtonsPlus}>
            <div className={styles.ErrorContainer}>
              {errors.non_field_errors?.map((message, idx) => (
                  <Alert key={idx} className={formStyles.ErrorAlert}>
                    {message}
                  </Alert>
                ))}
            </div>
            <div>
              <Button className={`${btnStyles.Button} ${styles.Button}`}>
                <Link to={'/plan'} className={styles.InnerButton}>
                  Cancel
                </Link>
              </Button>
              <Button className={`${btnStyles.Button} ${styles.Button}`} type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default FocusEdit