import { useEffect, useState } from 'react';
import { usePetsContext } from '../../context/PetsContext';
import { useUserContext } from '../../context/UserContext';
import PetDetails from './PetDetails';
import LikeButton from './LikeButton';
import PetButtons from './PetButtons';
import PetModal from './PetModal';
import OwnedPets from './OwnedPets';

function PetPage({ id }) {
  const { getPetPage, setPetPage, petPage, petModalShow, setPetModalShow } =
    usePetsContext();
  const { getUserById, user } = useUserContext();

  const [myPet, setMyPet] = useState(false);

  function verifyPet() {
    console.log('ID', id);
    console.log('PETS', user.adoptedPets, user.fosteredPets);
    if (user?.fosteredPets?.includes(id) || user?.adoptedPets?.includes(id)) {
      console.log('my pet');
      setMyPet(true);
    }
  }

  useEffect(() => verifyPet()), [];

  async function getPetData() {
    const pet = await getPetPage(id);
    setPetPage(pet);
  }

  useEffect(() => {
    getUserById(user._id);
    getPetData();
  }, []);

  useEffect(() => {
    getPetData();
  }, [petModalShow]);

  return (
    <div className="main-container petpage">
      <LikeButton id={id} />
      {petPage && <img src={petPage.picture} className="petpage-image" />}
      <div className="petpage-main-card">
        {petPage && <PetDetails petPage={petPage} />}
        {petPage?.adoptionStatus !== 'Available' && (
          <div className="unavailable">
            This {petPage?.type?.toLowerCase()} has already been{' '}
            {petPage?.adoptionStatus?.toLowerCase()} {myPet && 'by you'}{' '}
          </div>
        )}
        <div className="petpage-buttons">
          {(petPage?.adoptionStatus === 'Available' ||
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
        </div>
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
