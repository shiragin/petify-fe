import { useEffect, useRef, useState } from 'react';
import { Button, Form, Overlay, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import ContactModal from './ContactModal';

function ContactForm() {
  const {
    user,
    setUser,
    userId,
    getUserProfile,
    createNewQuery,
    error,
    setError,
  } = useUserContext();

  const target = useRef(null);

  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  const [query, setQuery] = useState({
    name: `${user?.firstName} ${user?.lastName}` || '',
    email: user?.email || '',
    userId: userId || '',
    topic: 'adoption',
    message: '',
  });

  async function getUserData() {
    const user = await getUserProfile();
    setUser(user);
  }

  function queryChangeHandler(e) {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  }

  async function querySubmitHandler(e) {
    e.preventDefault();
    const newQuery = await createNewQuery(query);
    console.log(newQuery);
    if (!newQuery.ok) setError({ show: true, message: newQuery.error });
    setModalShow(true);
  }

  useEffect(() => {
    setQuery({
      ...query,
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
    });
  }, [user]);

  useEffect(() => {
    if (userId && !user) {
      getUserData();
    }
  }, []);

  return (
    <Form
      className="pet-form pet-form-container"
      onSubmit={querySubmitHandler}
      onFocus={() => setError({ show: false, message: '' })}
    >
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Name</Form.Label>
        <Form.Control
          className="pet-input"
          type="text"
          name="name"
          required
          placeholder="Please enter your name"
          value={query?.name}
          onChange={(e) => queryChangeHandler(e)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="pet-label">Email</Form.Label>
        <Form.Control
          className="pet-input"
          type="email"
          name="email"
          required
          placeholder="Please enter your email address"
          value={query?.email}
          onChange={(e) => queryChangeHandler(e)}
        />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="pet-label">Interested in</Form.Label>
        <Form.Select
          className="pet-input"
          required
          name="topic"
          value={query?.topic}
          onChange={(e) => queryChangeHandler(e)}
        >
          <option value="adoption">Adoption & fostering a pet</option>
          <option value="returning">
            Returning an adopted or fostered pet
          </option>
          <option value="technical">Technical issues on the website</option>
          <option value="general">Something else</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="pet-label">Your message </Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          className="pet-input"
          type="textarea"
          name="message"
          required
          placeholder="Tell us more..."
          value={query?.message}
          onChange={(e) => queryChangeHandler(e)}
        />
      </Form.Group>
      <div className="submit-button">
        <Button
          ref={target}
          type="submit"
          value="submit"
          className="btn btn-skew-left login-submit-button"
        >
          <span>Submit</span>
        </Button>
        <Overlay target={target.current} show={error?.show} placement="top">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              {error?.message}
            </Tooltip>
          )}
        </Overlay>
      </div>
      <ContactModal
        show={modalShow}
        query={query}
        onHide={() => {
          setModalShow(false);
          navigate('/');
        }}
      />
    </Form>
  );
}

export default ContactForm;
