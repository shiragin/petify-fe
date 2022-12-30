import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePetsContext } from '../../context/PetsContext';
import PetForm from './PetForm';
import PetSubmit from './PetSubmit';
import PetModal from '../Pet/PetModal';

function PetAddNew() {
  const { addNewPet, petPage, setPetPage, setPetModalShow, petModalShow } =
    usePetsContext();

  const [newPet, setNewPet] = useState({
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

  const navigate = useNavigate();

  async function addPetHandler() {
    const res = await addNewPet(newPet);
    console.log('RES:', res);
    setPetPage(res);
    setPetModalShow(true);
  }

  return (
    <div className="pet-form-container">
      <PetForm newPet={newPet} setNewPet={setNewPet} />
      <PetSubmit onPetAdd={addPetHandler} />
      <PetModal
        show={petModalShow}
        onHide={() => {
          setPetModalShow(false);
          navigate(`/pet/${petPage._id}`);
        }}
        action={'added'}
        type={newPet.type}
        name={newPet.name}
      />
    </div>
  );
}

export default PetAddNew;
