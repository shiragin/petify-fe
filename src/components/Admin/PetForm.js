import { Form } from 'react-bootstrap';
function PetForm() {
  return (
    <Form
      className="pet-form"
      // onSubmit={(e) => {
      //   userSubmitHandler(e);
      // }}
      // onFocus={() => setError({ show: false })}
    >
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Pet Type</Form.Label>
        <Form.Select
          className="pet-input"
          type="text"
          required
          // placeholder="First name"
          // value={user?.firstName}
          // onChange={(e) => userFormHandler(e, 'firstName')}
        >
          <option value="Cat">Cat</option>
          <option value="Dog">Dog</option>
        </Form.Select>
        {/* </div> */}
        {/* <div> */}
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Pet name</Form.Label>
        <Form.Control
          className="pet-input"
          type="text"
          required
          placeholder="Enter pet name"
          // value={user?.lastName}
          // onChange={(e) => userFormHandler(e, 'lastName')}
        />
        {/* </div> */}
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Adoption Status</Form.Label>
        <Form.Select
          className="pet-input"
          required
          // placeholder="Email Address"
          // value={user?.email}
          // onChange={(e) => userFormHandler(e, 'email')}
        >
          <option value="Adopted">Adopted</option>
          <option value="Fostered">Fostered</option>
          <option value="Available">Available</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Height </Form.Label>
        <Form.Control
          className="pet-input"
          type="number"
          required
          placeholder="Enter pet height in cm"
          // value={user?.phoneNumber}
          // onChange={(e) => userFormHandler(e, 'phoneNumber')}
        />
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Weight </Form.Label>
        <Form.Control
          className="pet-input"
          type="number"
          placeholder="Enter pet weight in kg"
          // value={user?.password}
          // onChange={(e) => userFormHandler(e, 'password')}
        />
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Colour</Form.Label>
        {/* <Form.Control
          as="select"
          multiple
          className="pet-input"
          type="text"
          // value={user?.passwordConfirm}
          onChange={(e) => console.log(e.target.value)}
        >
          <option value="White">White</option>
          <option value="Black">Black</option>
          <option value="Orange">Orange</option> */}
        <div key="colour" className="pet-check">
          <div className="pet-check-row">
            <Form.Check
              inline
              label="White"
              // name="group1"
              type={'checkbox'}
              id={`colour`}
            />
            <Form.Check
              inline
              label="Orange"
              type={'checkbox'}
              // name="group1"
              id={`colour`}
            />
            <Form.Check
              inline
              label="Brown"
              type={'checkbox'}
              // name="group1"
              id={`colour`}
            />
          </div>
          <div className="pet-check-row">
            <Form.Check
              inline
              label="Grey"
              type={'checkbox'}
              // name="group1"
              // type={}
              id={`colour`}
            />
            <Form.Check
              inline
              label="Golden"
              type={'checkbox'}
              // name="group1"
              // type={}
              id={`colour`}
            />
            <Form.Check
              inline
              label="Black"
              type={'checkbox'}
              // name="group1"
              // type={}
              id={`colour`}
            />
          </div>
        </div>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={7}
          className="pet-input"
          type="number"
          required
          placeholder="Enter more information about the pet"
          // value={user?.phoneNumber}
          // onChange={(e) => userFormHandler(e, 'phoneNumber')}
        />
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Hypoallergenic</Form.Label>
        <Form.Select
          className="pet-input"
          required
          // placeholder="First name"
          // value={user?.firstName}
          // onChange={(e) => userFormHandler(e, 'firstName')}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </Form.Select>
        {/* <div key="hypo" className="pet-check pet-check-row">
          <Form.Check
            inline
            label="Yes"
            // name="group1"
            type={'radio'}
            id={`hypo`}
          />
          <Form.Check
            inline
            label="No"
            // name="group1"
            type={'radio'}
            id={`hypo`}
          />
        </div> */}
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Dietary restrictions</Form.Label>
        <Form.Control
          className="pet-input"
          type="text"
          required
          placeholder="Enter the pet's dietary information"
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
          placeholder="Enter the pet's breed"
          // value={user?.phoneNumber}
          // onChange={(e) => userFormHandler(e, 'phoneNumber')}
        />
      </Form.Group>
    </Form>
  );
}

export default PetForm;
