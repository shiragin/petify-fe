import { useUserContext } from '../context/UserContext';
import PetForm from '../components/Admin/PetForm';
import '../scss/PetForm.scss';

function AddPet() {
  return (
    <div className="profile main-container">
      <h1 className="profile-title">Add A New Pet </h1>
      <PetForm />
    </div>
  );
}

export default AddPet;
