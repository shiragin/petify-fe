import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useUserContext } from '../../libs/UserContext';
import Cat from '../../imgs/undraw_cat.svg';
import Dog from '../../imgs/undraw_dog.svg';

function LoginForm() {
  const { setLoginModalShow, loginForm, setLoginForm, getUser } =
    useUserContext();

  function clickHandler() {
    setLoginModalShow({ show: true, type: 'signup' });
  }

  const navigate = useNavigate();

  function loginChangeHandler(e, field) {
    const newField = {};
    newField[field] = e.target.value;
    setLoginForm({ ...loginForm, ...newField });
  }

  async function loginSubmitHandler(e) {
    e.preventDefault();
    console.log('hi');
    const signup = await getUser(loginForm);
    if (signup || loggedIn) {
      navigate('/');
    }
  }

  return (
    <Form className="login" onSubmit={loginSubmitHandler}>
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
      <Button className="login-submit-button btn-skew-left" type="submit">
        <span>Log In</span>
      </Button>
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
