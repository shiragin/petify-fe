import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useUserContext } from '../../libs/UserContext';
import SubmitButton from './SubmitButton';
import Cat from '../../imgs/undraw_cat.svg';
import Dog from '../../imgs/undraw_dog.svg';

function LoginForm() {
  const {
    loginModalShow,
    setLoginModalShow,
    loginForm,
    setLoginForm,
    getUser,
    error,
    setError,
    loggedIn,
  } = useUserContext();

  function clickHandler() {
    setLoginModalShow({ show: true, type: 'signup' });
  }

  const navigate = useNavigate();

  function loginChangeHandler(e, field) {
    setError({ show: false });
    const newField = {};
    newField[field] = e.target.value;
    setLoginForm({ ...loginForm, ...newField });
  }

  async function loginSubmitHandler(e) {
    e.preventDefault();
    const signup = await getUser(loginForm);
    if (signup || loggedIn) {
      navigate('/');
    } else {
      console.log('hi');
      await setError({ show: true, message: `Error! Couldn't log in` });
    }
  }

  return (
    <Form
      className="login"
      onSubmit={loginSubmitHandler}
      onFocus={() => setError({ show: false })}
    >
      <Form.Group>
        <Form.Label className="login-email-label">Email Address</Form.Label>
        <Form.Control
          className="login-email-input"
          type="email"
          required
          placeholder="Email Address"
          value={loginForm.email}
          onChange={(e) => loginChangeHandler(e, 'email')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="login-password-label">Password</Form.Label>
        <Form.Control
          className="login-password-input"
          type="password"
          label="Create password"
          required
          placeholder="Password"
          value={loginForm.password}
          onChange={(e) => loginChangeHandler(e, 'password')}
        />
      </Form.Group>
      <SubmitButton type={loginModalShow.type} />
      <div className="login-footer">
        <img src={Cat} />
        Haven't got an account yet?{' '}
        <a href="#" onClick={clickHandler}>
          Create an account
        </a>
      </div>
    </Form>
  );
}

export default LoginForm;
