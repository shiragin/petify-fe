import { useSearchParams } from 'react-router-dom';
import PetPage from '../components/Pet/PetPage';

function Pet() {
  const searchParams = new URLSearchParams(document.location.search);

  return (
    <div>
      <PetPage id={searchParams.get('id')} />
    </div>
  );
}
export default Pet;
