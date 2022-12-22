import { Form, Button } from 'react-bootstrap';
import { useUserContext } from '../../libs/UserContext';

function SignupForm() {
  const { setLoginShow } = useUserContext();

  function clickHandler() {
    setLoginShow({ show: true, type: 'login' });
  }

  return (
    <Form className="login">
      <Form.Group className="split">
        <div>
          <Form.Label className="login-firstname-label">First name</Form.Label>
          <Form.Control
            className="login-firstname-input"
            type="text"
            required
            placeholder="First name"
          />
        </div>
        <div>
          <Form.Label className="login-lastname-label">Last name</Form.Label>
          <Form.Control
            className="login-lastname-input"
            type="text"
            required
            placeholder="First name"
          />
        </div>
      </Form.Group>
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
        <Form.Label className="login-phone-label">Phone number</Form.Label>
        <Form.Control
          className="login-phone-input"
          type="phone"
          required
          placeholder="Phone number"
        />
      </Form.Group>
      <Form.Group className="split">
        <div>
          <Form.Label className="login-password-label">Password</Form.Label>
          <Form.Control
            className="login-password-input"
            type="password"
            label="Create password"
            required
            placeholder="Password"
          />
        </div>
        <div>
          <Form.Label className="login-confirm-label">
            Confirm password
          </Form.Label>
          <Form.Control
            className="login-confirm-input"
            type="password"
            label="Create password"
            required
            placeholder="Password"
          />
        </div>
      </Form.Group>
      <Button className="login-submit-button btn-skew-left" type="submit">
        <span>Sign up</span>
      </Button>
      <div className="login-footer">
        Already have an account?{' '}
        <a href="#" onClick={clickHandler}>
          Log in
        </a>
      </div>
    </Form>
  );
}

export default SignupForm;
