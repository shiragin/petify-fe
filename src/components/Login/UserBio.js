import { Form } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';

function UserBio() {
  const { user, setUser, setError, setConfirmSave } = useUserContext();

  function userFormHandler(e, field) {
    setError({ show: false });
    setConfirmSave(false);
    const newField = {};
    newField[field] = e.target.value;
    setUser({ ...user, ...newField });
  }

  return (
    <Form.Group className="form-group w-100">
      <Form.Label className="profile-label">More about yourself</Form.Label>
      <Form.Control
        as="textarea"
        rows={6}
        className="profile-input"
        type="textarea"
        placeholder="Tell us more..."
        value={user?.bio}
        onChange={(e) => userFormHandler(e, 'bio')}
      />
    </Form.Group>
  );
}

export default UserBio;
