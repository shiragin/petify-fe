import { useEffect, useState } from 'react';
import { usePetsContext } from '../../libs/PetsContext';
import PetDetails from './PetDetails';
import Cat from '../../imgs/cat-banner.jpg';
import Dog from '../../imgs/dog-banner.jpg';
import LikeButton from './LikeButton';

function PetPage({ id }) {
  const { getPetPage, petPage, setPetPage } = usePetsContext();
  // const [imgLoading, setImgLoading] = useState(true);

  console.log(petPage);
  useEffect(() => {
    getPetPage(id);
  }, []);

  return (
    // <div
    //   className={
    //     imgLoading ? 'main-container petpage hide' : 'main-container petpage'
    //   }
    // >
    <div className="main-container petpage">
      <LikeButton />
      <img
        src={petPage?.type === 'Cat' ? Cat : Dog}
        className="petpage-image"
        // onLoad={() => setImgLoading(false)}
      />
      <PetDetails />
    </div>
  );
}

export default PetPage;
