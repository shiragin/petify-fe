import { useEffect } from 'react';
import { usePetsContext } from '../../libs/PetsContext';

function PetPage({ id }) {
  console.log(id);
  const { getPetPage, petPage, setPetPage } = usePetsContext();

  useEffect(() => {
    getPetPage(id);
  }, []);

  return <div>{petPage.name}</div>;
}

export default PetPage;
