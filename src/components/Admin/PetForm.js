import { Form } from 'react-bootstrap';
function PetForm() {
  return (
    <Form
      className="pet"
      onSubmit={(e) => {
        userSubmitHandler(e);
      }}
      onFocus={() => setError({ show: false })}
    >
      <Form.Group className="form-group split">
        <div>
          <Form.Label className="pet-label">Pet Type</Form.Label>
          <Form.Control
            className="pet-input"
            type="text"
            required
            placeholder="First name"
            // value={user?.firstName}
            // onChange={(e) => userFormHandler(e, 'firstName')}
          />
        </div>
        <div>
          <Form.Label className="pet-label">Pet name</Form.Label>
          <Form.Control
            className="pet-input"
            type="text"
            required
            placeholder="Last name"
            // value={user?.lastName}
            // onChange={(e) => userFormHandler(e, 'lastName')}
          />
        </div>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Adoption Status</Form.Label>
        <Form.Control
          className="pet-email-input"
          type="email"
          required
          // placeholder="Email Address"
          // value={user?.email}
          // onChange={(e) => userFormHandler(e, 'email')}
        />
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Height (in cm)</Form.Label>
        <Form.Control
          className="pet-input"
          type="number"
          required
          placeholder="Height"
          // value={user?.phoneNumber}
          // onChange={(e) => userFormHandler(e, 'phoneNumber')}
        />
      </Form.Group>
      <Form.Group className="form-group split">
        <div>
          <Form.Label className="pet-label">Weight (in kg)</Form.Label>
          <Form.Control
            className="pet--input"
            type="number"
            placeholder="Weight"
            // value={user?.password}
            // onChange={(e) => userFormHandler(e, 'password')}
          />
        </div>
        <div>
          <Form.Label className="pet-label">Colour</Form.Label>
          <Form.Control
            className="pet-input"
            type="text"
            // value={user?.passwordConfirm}
            // onChange={(e) => userFormHandler(e, 'passwordConfirm')}
          />
        </div>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Bio</Form.Label>
        <Form.Control
          as="textarea"
          className="pet-input"
          type="number"
          required
          placeholder="Height"
          // value={user?.phoneNumber}
          // onChange={(e) => userFormHandler(e, 'phoneNumber')}
        />
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Hypoallergenic</Form.Label>
        <Form.Control className="pet-input" type="text" require />
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Dietary restrictions</Form.Label>
        <Form.Control
          className="pet-input"
          type="text"
          required
          // placeholder="Height"
          // value={user?.phoneNumber}
          // onChange={(e) => userFormHandler(e, 'phoneNumber')}
        />
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Breed</Form.Label>
        <Form.Control
          className="pet-input"
          type="text"
          required
          placeholder="Breed"
          // value={user?.phoneNumber}
          // onChange={(e) => userFormHandler(e, 'phoneNumber')}
        />
      </Form.Group>
    </Form>
  );
}

export default PetForm;
