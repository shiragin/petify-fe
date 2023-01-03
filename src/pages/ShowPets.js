import PetList from '../components/Admin/PetList';
import '../scss/ShowPets.scss';

function ShowPets() {
  return (
    <div className="main-container show-pets">
      <h1 className="profile-title">All Pets List</h1>
      <PetList />
    </div>
  );
}

export default ShowPets;
