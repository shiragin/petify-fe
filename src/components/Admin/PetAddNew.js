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
  const [petError, setPetError] = useState({ show: false, message: '' });

  const navigate = useNavigate();

  async function petAddHandler() {
    setIsLoading(true);
    const res = await addNewPet(newPet);
    if (res.ok === true) {
      setPetPage(res.petDetails);
      setPetModalShow(true);
    } else {
      console.log(res);
      setPetError({ show: true, message: res.message });
    }
    setIsLoading(false);
  }

  async function petEditHandler() {
    setIsLoading(true);
    const res = await updatePet(newPet._id, newPet);
    if (res.ok === true) {
      setPetPage(res.petDetails);
      setPetModalShow(true);
    } else {
      console.log(res);
      setPetError({ show: true, message: res.message });
    }
    setIsLoading(false);
  }

  return (
    <div className="pet-form-container">
      <PetForm
        id={id}
        newPet={newPet}
        setNewPet={setNewPet}
        action={id ? 'edit' : 'create'}
        setPetError={setPetError}
      />
      <PetSubmit
        isLoading={isLoading}
        onPetAdd={petAddHandler}
        onPetEdit={petEditHandler}
        action={id ? 'edit' : 'create'}
        petError={petError}
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
