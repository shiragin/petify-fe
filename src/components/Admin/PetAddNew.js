import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePetsContext } from '../../context/PetsContext';
import PetForm from './PetForm';
import PetSubmit from './PetSubmit';
import PetModal from '../Pet/PetModal';

function PetAddNew({ id }) {
  const {
    addNewPet,
    petPage,
    setPetPage,
    setPetModalShow,
    petModalShow,
    getPetPage,
    updatePet,
  } = usePetsContext();

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
    picture: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function petAddHandler() {
    setIsLoading(true);
    console.log(newPet);
    const res = await addNewPet(newPet);
    console.log('RES:', res);
    setPetPage(res);
    setPetModalShow(true);
    setIsLoading(false);
  }

  async function petEditHandler() {
    setIsLoading(true);
    console.log(newPet);
    const res = await updatePet(newPet._id, newPet);
    console.log('RES:', res);
    setPetPage(res);
    setPetModalShow(true);
    setIsLoading(false);
  }

  return (
    <div className="pet-form-container">
      <PetForm
        id={id}
        newPet={newPet}
        setNewPet={setNewPet}
        action={id ? 'edit' : 'create'}
      />
      <PetSubmit
        isLoading={isLoading}
        onPetAdd={petAddHandler}
        onPetEdit={petEditHandler}
        action={id ? 'edit' : 'create'}
      />
      <PetModal
        show={petModalShow}
        onHide={() => {
          setPetModalShow(false);
          navigate(`/pet/${petPage._id}`);
        }}
        action={id ? 'edited in' : 'added to'}
        type={newPet.type}
        name={newPet.name}
      />
    </div>
  );
}

export default PetAddNew;
