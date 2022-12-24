import { useEffect } from 'react';
import { usePetsContext } from '../../libs/PetsContext';
import PetDetails from './PetDetails';
import Cat from '../../imgs/cat-banner.jpg';
import Dog from '../../imgs/dog-banner.jpg';
import LikeButton from './LikeButton';

function PetPage({ id }) {
  const { getPetPage, petPage, setPetPage } = usePetsContext();

  useEffect(() => {
    getPetPage(id);
  }, []);

  return (
    <div className="main-container petpage">
      <LikeButton />
      <img src={petPage.type === 'Cat' ? Cat : Dog} className="petpage-image" />
      <PetDetails />
    </div>
  );
}

export default PetPage;
