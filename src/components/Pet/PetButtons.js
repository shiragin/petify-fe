import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { TbArrowBigRight } from 'react-icons/tb';
import { useUserContext } from '../../context/UserContext';
import { usePetsContext } from '../../context/PetsContext';

function PetButtons({ type, id, pet }) {
  const { user, setUser, setLoginModalShow, updateUser } = useUserContext();
  const { getPetPage, updatePet, setPetModalShow } = usePetsContext();
  const [buttonType, setButtonType] = useState({});

  console.log(pet);

  useEffect(() => {
    if (type === 'adopt') {
      setButtonType({
        type: 'adopt',
        text: `Adopt this ${pet}`,
      });
    } else if (type === 'foster') {
      setButtonType({
        type: 'foster',
        text: `Foster this ${pet}`,
      });
    } else {
      setButtonType({
        type: 'return',
        text: `Return this ${pet}`,
      });
    }
  }, []);

  function petActionHandler(type) {
    if (!user) return;
    if (!user?.email) {
      return setLoginModalShow({ show: true, type: 'login' });
    } else {
      switch (type) {
        case 'adopt':
          adoptPet();
          break;
        case 'foster':
          fosterPet();
          break;
        case 'return':
          returnPet();
      }
    }
  }

  async function adoptPet() {
    if (!user) return;
    if (!user?.adoptedPets.includes(id)) {
      user.adoptedPets.push(id);
      console.log('pet added');
    }
    const update = updateUser(user._id);
    const pet = await getPetPage(id);
    pet.adoptionStatus = 'Adopted';
    pet.owner = user._id;
    updatePet(id, pet);
    update && console.log(`Pet adopted by ${user.firstName}`);
    setPetModalShow(true);
  }

  async function fosterPet() {
    if (!user) return;
    if (!user?.fosteredPets.includes(id)) {
      user.fosteredPets.push(id);
    }
    const update = updateUser(user._id);
    const pet = await getPetPage(id);
    pet.adoptionStatus = 'Fostered';
    pet.owner = user._id;
    updatePet(id, pet);
    update && console.log(`Pet fostered by ${user.firstName}`);
    setPetModalShow(true);
  }

  async function returnPet() {
    if (!user) return;
    if (user?.fosteredPets.includes(id)) {
      user.fosteredPets = user.fosteredPets.filter((pet) => pet !== id);
    }
    if (user?.adoptedPets.includes(id)) {
      user.adoptedPets = user.adoptedPets.filter((pet) => pet !== id);
    }
    const update = await updateUser(user._id);
    const pet = await getPetPage(id);
    pet.adoptionStatus = 'Available';
    pet.owner = '';
    updatePet(id, pet);
    update && console.log(`Pet returned by evil nasty ${user.firstName}`);
    setUser(user);
    setPetModalShow(true);
  }

  return (
    <Button
      className="petpage-button"
      onClick={() => petActionHandler(buttonType.type)}
    >
      <TbArrowBigRight />
      {buttonType.text}
    </Button>
  );
}

export default PetButtons;
