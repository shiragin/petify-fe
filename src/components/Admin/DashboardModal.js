import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';
import { usePetsContext } from '../../context/PetsContext';

function DashboardModal(props) {
  const { getUserProfile } = useUserContext();
  const { getOwnedPets } = usePetsContext();

  const [viewedUser, setViewedUser] = useState({});
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [fosteredPets, setFosteredPets] = useState([]);

  const navigate = useNavigate();

  async function getUserData() {
    const user = await getUserProfile(props.id);
    setViewedUser(user);
  }

  async function getPetsData() {
    const { adoptedPets, fosteredPets } = await getOwnedPets(props.id);
    setAdoptedPets(adoptedPets);
    setFosteredPets(fosteredPets);
  }

  function petClickHandler(id) {
    props.onHide();
    navigate(`/pet/${id}`);
  }

  useEffect(() => {
    if (props.id) getUserData();
  }, [props.show]);

  useEffect(() => {
    if (props.id && viewedUser) getPetsData();
  }, [viewedUser]);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h2>{`${viewedUser?.firstName} ${viewedUser?.lastName}`}</h2>
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
                        div
                        className="pet-item"
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DashboardModal;
