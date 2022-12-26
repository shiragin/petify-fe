import { useEffect } from 'react';
import { usePetsContext } from '../../libs/PetsContext';
import PetDetails from './PetDetails';
import Cat from '../../imgs/cat-banner.jpg';
import Dog from '../../imgs/dog-banner.jpg';
import LikeButton from './LikeButton';

function PetPage({ id }) {
  const { getPetPage, petPage, setPetPage } = usePetsContext();
  console.log(petPage);
  useEffect(() => {
    getPetPage(id);
  }, []);

  return (
    <div className="main-container petpage">
      <LikeButton />
      <img
        src={petPage?.type === 'Cat' ? Cat : Dog}
        className="petpage-image"
      />
      <PetDetails />
    </div>
  );
}

export default PetPage;
