import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import PetAddNew from '../components/Admin/PetAddNew';
import '../scss/PetForm.scss';
import { useEffect } from 'react';

function AddPet() {
  const { user, userId } = useUserContext();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.email && !user.isAdmin) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className="add-pet main-container">
      <h1 className="profile-title">{id ? 'Edit Pet' : 'Add A New Pet'}</h1>
      <PetAddNew id={id} />
    </div>
  );
}

export default AddPet;
