import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

function PetForm({ newPet, setNewPet }) {
  const [newColour, setNewColour] = useState([]);

  function newPetChangeHandler(e, field) {
    const newField = {};
    newField[field] = e.target.value;
    setNewPet({ ...newPet, ...newField });
  }

  function newPetColourHandler({ target: { checked, value } }) {
    if (checked) {
      setNewColour([...newColour, value]);
    } else {
      const colours = newColour.filter((col) => col !== value);
      setNewColour([...colours]);
    }
  }

  useEffect(
    () => setNewPet({ ...newPet, colour: newColour }, [newPet]),
    [newColour]
  );

  return (
    <Form
      className="pet-form"
      // onFocus={() => setError({ show: false })}
    >
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Pet Type</Form.Label>
        <Form.Select
          className="pet-input"
          type="text"
          required
          value={newPet?.type}
          onChange={(e) => newPetChangeHandler(e, 'type')}
        >
          <option value="Cat">Cat</option>
          <option value="Dog">Dog</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="pet-label">Pet Name</Form.Label>
        <Form.Control
          className="pet-input"
          type="text"
          required
          placeholder="Enter pet name"
          value={newPet?.name}
          onChange={(e) => newPetChangeHandler(e, 'name')}
        />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="pet-label">Adoption Status</Form.Label>
        <Form.Select
          className="pet-input"
          required
          value={newPet?.adoptionStatus}
          onChange={(e) => newPetChangeHandler(e, 'adoptionStatus')}
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
          value={newPet?.height}
          onChange={(e) => newPetChangeHandler(e, 'height')}
        />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="pet-label">Weight </Form.Label>
        <Form.Control
          className="pet-input"
          type="number"
          placeholder="Enter pet weight in kg"
          value={newPet?.weight}
          onChange={(e) => newPetChangeHandler(e, 'weight')}
        />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="pet-label">Colour</Form.Label>
        <div
          key={'colour'}
          className="pet-check"
          onChange={(e) => newPetColourHandler(e)}
        >
          <div className="pet-check-row">
            <Form.Check
              inline
              label="White"
              name="colour"
              type={'checkbox'}
              id={`colour`}
              value="White"
            />
            <Form.Check
              inline
              label="Orange"
              type={'checkbox'}
              name="colour"
              id={`colour`}
              value="Orange"
            />
            <Form.Check
              inline
              label="Brown"
              type={'checkbox'}
              name="colour"
              id={`colour`}
              value="Brown"
            />
          </div>
          <div className="pet-check-row">
            <Form.Check
              inline
              label="Grey"
              type={'checkbox'}
              id={`colour`}
              value="Grey"
            />
            <Form.Check
              inline
              label="Golden"
              type={'checkbox'}
              // name="group1"
              // type={}
              id={`colour`}
              value="Golden"
            />
            <Form.Check
              inline
              label="Black"
              type={'checkbox'}
              id={`colour`}
              value="Black"
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
          value={newPet?.bio}
          onChange={(e) => newPetChangeHandler(e, 'bio')}
        />
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Hypoallergenic</Form.Label>
        <Form.Select
          className="pet-input"
          required
          value={newPet?.hypoallergenic}
          onChange={(e) => newPetChangeHandler(e, 'hypoallergenic')}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Dietary Restrictions</Form.Label>
        <Form.Control
          className="pet-input"
          type="text"
          placeholder="Enter the pet's dietary information"
          value={newPet?.dietry}
          onChange={(e) => newPetChangeHandler(e, 'dietry')}
        />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="pet-label">Breed</Form.Label>
        <Form.Control
          className="pet-input"
          type="text"
          required
          placeholder="Enter the pet's breed"
          value={newPet?.breed}
          onChange={(e) => newPetChangeHandler(e, 'breed')}
        />
      </Form.Group>
    </Form>
  );
}

export default PetForm;
