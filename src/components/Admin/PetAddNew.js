import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePetsContext } from '../../context/PetsContext';
import PetForm from './PetForm';
import PetSubmit from './PetSubmit';
import PetModal from '../Pet/PetModal';

function PetAddNew({ id }) {
  const {
    petPage,
    setPetPage,
    setPetModalShow,
    addNewPet,
    petModalShow,
    updateOwnedPet,
  } = usePetsContext();

  const [newPet, setNewPet] = useState({
    type: 'Cat',
    name: '',
    age: '',
    adoptionStatus: 'Available',
    height: '',
    weight: '',
    colour: [],
    bio: '',
    hypoallergenic: false,
    dietary: [],
    breed: '',
    picture: '',
    owner: '',
  });

  const [owners, setOwners] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [petError, setPetError] = useState({ show: false, message: '' });

  const navigate = useNavigate();

  function findNewOwner() {
    if (
      newPet.adoptionStatus === 'Fostered' ||
      newPet.adoptionStatus === 'Adopted'
    ) {
      if (!newPet.owner) {
        setPetError({
          show: true,
          message: 'You must choose an owner for a fostered or an adopted pet.',
        });
      } else {
        const newOwner = owners.find((owner) => owner._id === newPet.owner);
        return newOwner;
      }
    } else {
      newPet.owner = '';
    }
  }

  async function handleNewOwner(pet, newOwner) {
    if (
      pet.adoptionStatus === 'Fostered' &&
      !newOwner.fosteredPets.includes(pet._id)
    ) {
      newOwner.fosteredPets.push(pet._id);
      await updateOwnedPet(newOwner, pet, pet._id);
      console.log('New fostered pet added');
    }
  }

  async function petAddHandler() {
    console.log('wow');
    setIsLoading(true);
    const newOwner = findNewOwner();
    console.log(newPet);
    const res = await addNewPet(newPet);
    if (res.ok === true) {
      console.log(res);
      handleNewOwner(res.petDetails, newOwner);
      setPetPage(res.petDetails);
      setPetModalShow(true);
    } else {
      setPetError({ show: true, message: res.message });
    }
    setIsLoading(false);
  }

  async function petEditHandler() {
    // handleOwner();
    setIsLoading(true);
    const res = await updatePet(newPet._id, newPet);
    if (res.ok === true) {
      setPetPage(res.petDetails);
      setPetModalShow(true);
    } else {
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
        owners={owners}
        setOwners={setOwners}
      />
      <PetSubmit
        isLoading={isLoading}
        onPetAdd={petAddHandler}
        onPetEdit={petEditHandler}
        action={id ? 'edit' : 'create'}
        petError={petError}
        owners={owners}
        setOwners={setOwners}
      />
      <PetModal
        show={petModalShow}
        onHide={() => {
          setPetModalShow(false);
          navigate(`/pet/${petPage._id}`);
        }}
        action={id ? 'edited in' : 'added to'}
        type={newPet?.type}
        name={newPet?.name}
      />
    </div>
  );
}

export default PetAddNew;
