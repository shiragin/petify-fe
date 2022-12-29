import { useEffect, useState } from 'react';
import { usePetsContext } from '../../context/PetsContext';
import { useUserContext } from '../../context/UserContext';
import PetDetails from './PetDetails';
import LikeButton from './LikeButton';
import PetButtons from './PetButtons';
import PetModal from './PetModal';

function PetPage({ id }) {
  const { getPetPage, setPetPage, petPage, petModalShow, setPetModalShow } =
    usePetsContext();
  const { user } = useUserContext();

  const [myPet, setMyPet] = useState(false);

  useEffect(
    () => {
      if (user.fosteredPets.includes(id) || user.adoptedPets.includes(id)) {
        setMyPet(true);
      }
    },
    [],
    [user]
  );

  async function getPetData() {
    const pet = await getPetPage(id);
    setPetPage(pet);
  }

  useEffect(() => {
    getPetData();
  }, []);

  useEffect(() => {
    getPetData();
  }, [petModalShow]);

  return (
    <div className="main-container petpage">
      <LikeButton id={id} />
      <img src={petPage.picture} className="petpage-image" />
      <PetDetails />
      <div className="petpage-buttons">
        {(petPage.adoptionStatus === 'Available' ||
          (myPet && petPage.adoptionStatus === 'Fostered')) && (
          <PetButtons type={'adopt'} id={id} />
        )}
        {petPage.adoptionStatus === 'Available' && (
          <PetButtons type={'foster'} id={id} />
        )}
        {myPet &&
          (petPage.adoptionStatus === 'Adopted' ||
            petPage.adoptionStatus === 'Fostered') && (
            <PetButtons type={'return'} id={id} />
          )}
        {!myPet && petPage.adoptionStatus !== 'Available' && (
          <div className="unavailable">This pet has been adopted</div>
        )}
      </div>
      <PetModal
        show={petModalShow}
        onHide={() => setPetModalShow(false)}
        pet={petPage.name}
        status={petPage.adoptionStatus}
      />
    </div>
  );
}

export default PetPage;
