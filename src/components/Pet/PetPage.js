import { useEffect } from 'react';
import { usePetsContext } from '../../libs/PetsContext';
import PetDetails from './PetDetails';
import LikeButton from './LikeButton';
import PetButtons from './PetButtons';

function PetPage({ id }) {
  const { getPetPage, setPetPage, petPage } = usePetsContext();

  async function getPetData() {
    const pet = await getPetPage(id);
    setPetPage(pet);
  }

  useEffect(() => {
    getPetData();
  }, []);

  console.log(petPage);

  return (
    <div className="main-container petpage">
      <LikeButton id={id} />
      <img src={petPage.picture} className="petpage-image" />
      <PetDetails />
      <div className="petpage-buttons">
        <PetButtons type={'adopt'} />
        <PetButtons type={'foster'} />
        <PetButtons type={'return'} />
      </div>
    </div>
  );
}

export default PetPage;
