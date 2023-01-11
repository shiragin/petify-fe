import { useEffect, useState } from 'react';
import { FaChevronCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { usePetsContext } from '../../context/PetsContext';
import { useUserContext } from '../../context/UserContext';

function UserDetails({ id, setShowUser }) {
  const { getUserProfile } = useUserContext();
  const { getOwnedPets } = usePetsContext();

  const [viewedUser, setViewedUser] = useState({});
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [fosteredPets, setFosteredPets] = useState([]);

  const navigate = useNavigate();

  async function getUserData() {
    const user = await getUserProfile(id);
    setViewedUser(user);
  }

  async function getPetsData() {
    const { adoptedPets, fosteredPets } = await getOwnedPets(id);
    setAdoptedPets(adoptedPets);
    setFosteredPets(fosteredPets);
  }

  function petClickHandler(id) {
    navigate(`/pet/${id}`);
  }

  useEffect(() => {
    if (id) getUserData();
  }, []);

  useEffect(() => {
    if (id && viewedUser) getPetsData();
  }, [viewedUser]);

  return (
    <div className="user-page">
      <FaChevronCircleLeft
        className="petpage-back userpage-back"
        onClick={() => {
          setShowUser({ show: false });
          navigate('/admin/show-users');
        }}
      />
      <h2 className="user-title">{`${viewedUser?.firstName} ${viewedUser?.lastName}`}</h2>
      <div className="user-details">
        <div>
          <span>Email</span> {viewedUser?.email}
        </div>
        <div>
          <span>Phone</span> {viewedUser?.phoneNumber}
        </div>

        <div>
          <span>User Bio</span> {viewedUser?.bio}
        </div>
        <div className="pet-list">
          <div>
            <span>Adopted Pets</span>{' '}
          </div>
          <div className="pet-items">
            {adoptedPets.length
              ? adoptedPets.map((pet) => {
                  return (
                    <div
                      className="pet-item"
                      key={pet._id}
                      onClick={() => petClickHandler(pet._id)}
                    >
                      <img src={pet.picture} />
                      <div>{pet.name}</div>
                    </div>
                  );
                })
              : 'None'}
          </div>
        </div>
        <div className="pet-list">
          <div>
            <span>Fostered Pets</span>{' '}
          </div>
          <div className="pet-items">
            {fosteredPets.length
              ? fosteredPets.map((pet) => {
                  return (
                    <div
                      className="pet-item"
                      key={pet._id}
                      onClick={() => petClickHandler(pet._id)}
                    >
                      <img src={pet.picture} />
                      <div>{pet.name}</div>
                    </div>
                  );
                })
              : 'None'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
