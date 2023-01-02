import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
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
  const [imgLoading, setImgLoading] = useState(true);

  function verifyPet() {
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
    setPetPage({});
    // getUserById(user._id);
    getPetData();
  }, []);

  useEffect(() => {
    getPetData();
  }, [petModalShow]);

  return (
    <div className="main-container petpage">
      {imgLoading || <LikeButton id={id} />}
      <div className="petpage-image-container">
        {imgLoading && <Spinner />}
        <img
          src={petPage.picture}
          className={imgLoading ? 'petpage-image hide' : 'petpage-image'}
          onLoad={() =>
            setTimeout(() => {
              setImgLoading(false);
            }, 500)
          }
        />
      </div>
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
            <PetButtons
              type={'adopt'}
              id={id}
              pet={petPage?.type.toLowerCase()}
            />
          )}
          {petPage.adoptionStatus === 'Available' && (
            <PetButtons
              type={'foster'}
              id={id}
              pet={petPage?.type.toLowerCase()}
            />
          )}
          {myPet &&
            (petPage.adoptionStatus === 'Adopted' ||
              petPage.adoptionStatus === 'Fostered') && (
              <PetButtons
                type={'return'}
                id={id}
                pet={petPage?.type.toLowerCase()}
              />
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
