import { useEffect } from 'react';
import { usePetsContext } from '../../libs/PetsContext';
import PetDetails from './PetDetails';
import LikeButton from './LikeButton';

function PetPage({ id }) {
  const { getPetPage, petPage } = usePetsContext();

  useEffect(() => {
    getPetPage(id);
  }, []);

  return (
    <div className="main-container petpage">
      <LikeButton id={id} />
      <img src={petPage.picture} className="petpage-image" />
      <PetDetails />
    </div>
  );
}

export default PetPage;
