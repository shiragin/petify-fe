import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import PetAddNew from '../components/Admin/PetAddNew';
import '../scss/PetForm.scss';

function AddPet() {
  const { user } = useUserContext();
  const { id } = useParams();

  const navigate = useNavigate();

  if (!user.isAdmin) {
    navigate('/');
  }

  return (
    <div className="add-pet main-container">
      <h1 className="profile-title">{id ? 'Edit Pet' : 'Add A New Pet'}</h1>
      <PetAddNew id={id} />
    </div>
  );
}

export default AddPet;
