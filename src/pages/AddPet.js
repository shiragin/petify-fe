import { useUserContext } from '../context/UserContext';
import PetForm from '../components/Admin/PetForm';
import PetSubmit from '../components/Admin/PetSubmit';
import '../scss/PetForm.scss';

function AddPet() {
  return (
    <div className="add-pet main-container">
      <h1 className="profile-title">Add A New Pet </h1>
      <PetForm />
      <PetSubmit />
    </div>
  );
}

export default AddPet;
