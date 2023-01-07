import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { usePetsContext } from '../../context/PetsContext';

function PetForm({ id, newPet, setNewPet, action, setPetError }) {
  const { getPetPage } = usePetsContext();

  const [newColour, setNewColour] = useState([]);

  function newPetChangeHandler(e, field) {
    // setPetError({ show: false, message: '' });
    const newField = {};
    newField[field] = e.target.value;
    setNewPet({ ...newPet, ...newField });
  }

  function newPetColourHandler({ target: { checked, value } }) {
    // setPetError({ show: false, message: '' });
    if (checked) {
      setNewColour([...newColour, value]);
    } else {
      const colours = newColour.filter((col) => col !== value);
      setNewColour([...colours]);
    }
  }

  function newPetImageHandler(e) {
    console.dir(e.target.files[0]);
    setNewPet({ ...newPet, picture: e.target.files[0] });
  }

  async function getPetDetails(id) {
    const pet = await getPetPage(id);
    pet && setNewPet(pet);
    pet && setNewColour(pet.colour);
  }

  useEffect(() => {
    setNewPet({
      type: 'Cat',
      name: '',
      adoptionStatus: 'Available',
      height: '',
      weight: '',
      colour: [],
      bio: '',
      hypoallergenic: false,
      dietary: [],
      breed: '',
    });
    if (action === 'edit') {
      getPetDetails(id);
    }
  }, [action]);

  useEffect(() => {
    setNewPet({ ...newPet, colour: newColour });
  }, [newColour]);

  return (
    <Form
      className="pet-form"
      onFocus={() => setPetError({ show: false, message: '' })}
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
              checked={newPet?.colour.includes('White')}
              inline
              label="White"
              name="colour"
              type={'checkbox'}
              id={`colour`}
              value="White"
            />
            <Form.Check
              inline
              checked={newPet?.colour.includes('Orange')}
              label="Orange"
              type={'checkbox'}
              name="colour"
              id={`colour`}
              value="Orange"
            />
            <Form.Check
              inline
              checked={newPet?.colour.includes('Brown')}
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
              checked={newPet?.colour.includes('Grey')}
              label="Grey"
              type={'checkbox'}
              id={`colour`}
              value="Grey"
            />
            <Form.Check
              inline
              checked={newPet?.colour.includes('Golden')}
              label="Golden"
              type={'checkbox'}
              // name="group1"
              // type={}
              id={`colour`}
              value="Golden"
            />
            <Form.Check
              inline
              checked={newPet?.colour.includes('Black')}
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
      <Form.Group className="form-group">
        <Form.Label className="pet-label">Pet Image</Form.Label>
        <Form.Control
          className="pet-input"
          type="file"
          required
          onChange={(e) => newPetImageHandler(e)}
        />
      </Form.Group>
    </Form>
  );
}

export default PetForm;
