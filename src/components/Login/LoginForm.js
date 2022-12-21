import { Form, Button } from 'react-bootstrap';
import { useUserContext } from '../../libs/UserContext';
import Cat from './undraw_cat.svg';

function LoginForm() {
  const { setLoginShow } = useUserContext();

  function clickHandler() {
    setLoginShow({ show: true, type: 'signup' });
  }

  return (
    <Form className="login">
      <Form.Group>
        <Form.Label className="login-email-label">Email Address</Form.Label>
        <Form.Control
          className="login-email-input"
          type="email"
          required
          placeholder="Email Address"
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
        />
      </Form.Group>
      <Button className="login-submit-button" type="submit">
        Log In
      </Button>
      <div className="login-footer">
        <img src={Cat} />
        Don't have an account yet?{' '}
        <a href="#" onClick={clickHandler}>
          Create an account
        </a>
      </div>
    </Form>
  );
}

export default LoginForm;
