import { useParams } from 'react-router-dom';
import PetPage from '../components/Pet/PetPage';
import '../scss/PetPage.scss';

function Pet() {
  const { id } = useParams();

  return (
    <div>
      <PetPage id={id} />
    </div>
  );
}
export default Pet;
