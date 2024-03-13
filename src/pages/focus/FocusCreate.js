import React, { useState } from 'react';
import pageStyles from '../../styles/Page.module.css';
import btnStyles from '../../styles/Button.module.css';
import formStyles from '../../styles/Form.module.css';
import styles from '../../styles/FocusCreate.module.css';
import defaultImage from '../../assets/default-focus.jpg';
import { Button, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const FocusCreate = () => {

  const [focusData, setFocusData] = useState({
    name: '',
    why: '',
    image: '',
  });

  const { name, why, image } = focusData;

  const handleChange = (event) => {
    setFocusData({
      ...focusData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length){
      URL.revokeObjectURL(image);
      setFocusData({
        ...focusData,
        image: URL.createObjectURL(event.target.files[0])
      });
    }
  };

  return (
    <div className={pageStyles.PageContainer}>
      <div className={pageStyles.TitleContainer}>
        <h1 className={pageStyles.Title}>Create a new focus</h1>
      </div>
      <div className={`${pageStyles.ContentContainer} ${formStyles.FormContainer}`}>
        <Form>
          <div className={styles.FocusForm}>
            <Form.Group className={styles.ImageGroup}>
              {image ? (
                <>
                  <div className={styles.ImagePlus}>
                    <figure className={styles.ImageContainer}>
                      <Image src={image} className={styles.Image}/>
                    </figure>
                    <div className={styles.Centre}>
                      <Form.Label
                        className={btnStyles.Button}
                        htmlFor="image-upload"
                      >
                        Change the image
                      </Form.Label>
                    </div>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <div className={styles.ImagePlus}>
                    <div className={styles.ImageContainer}>
                      <img src={defaultImage} alt={"Click or tap to upload an image"} className={styles.Image}/>
                    </div>
                    <p>"Click or tap to upload an image"</p>
                  </div>
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                className={styles.FormFile}
                onChange={handleChangeImage}
              />

            </Form.Group>
            <div className={styles.MainForm}>
              <Form.Group controlId="name" className={styles.Group}>
                <Form.Label className={formStyles.FormLabel}>Focus:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Give your focus area a name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="why" className={styles.Group}>
                <Form.Label className={formStyles.FormLabel}>Why:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Why is this area important to you? Why do you want to focus on it?"
                  name="why"
                  value={why}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>
          <div className={styles.Buttons}>
            <Button className={btnStyles.Button}>
              <Link to={'/plan'} className={styles.InnerButton}>
                Cancel
              </Link>
            </Button>
            <Button className={btnStyles.Button} type="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div> 
  )
}

export default FocusCreate