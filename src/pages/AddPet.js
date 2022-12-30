import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import PetAddNew from '../components/Admin/PetAddNew';
import '../scss/PetForm.scss';

function AddPet() {
  const { user } = useUserContext();

  const navigate = useNavigate();

  if (!user.isAdmin) {
    navigate('/');
  }

  return (
    <div className="add-pet main-container">
      <h1 className="profile-title">Add A New Pet </h1>
      <PetAddNew />
    </div>
  );
}

export default AddPet;
