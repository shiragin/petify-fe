import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { usePetsContext } from '../../context/PetsContext';
import { useUserContext } from '../../context/UserContext';
import PetDetails from './PetDetails';
import LikeButton from './LikeButton';
import PetButtons from './PetButtons';
import PetModal from './PetModal';
import { FaChevronCircleLeft, FaEdit } from 'react-icons/fa';

function PetPage({ id }) {
  const { getPetPage, setPetPage, petPage, petModalShow, setPetModalShow } =
    usePetsContext();
  const { user, userId, getUserProfile, loggedIn, setLoginModalShow } =
    useUserContext();

  const [myPet, setMyPet] = useState(false);
  const [petOwner, setPetOwner] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const navigate = useNavigate();

  async function verifyPet() {
    if (user?.fosteredPets?.includes(id) || user?.adoptedPets?.includes(id)) {
      setMyPet(true);
    } else {
      if (petPage?.owner) {
        const petOwner = await getUserProfile(petPage.owner);
        setPetOwner(petOwner);
      }
    }
  }

  async function getPetData() {
    const pet = await getPetPage(id);
    if (pet) setPetPage(pet);
    else navigate('/not-found');
  }

  function contactClickHandler() {
    if (!user?.email || !loggedIn)
      setLoginModalShow({ show: true, type: 'login' });
    else {
      navigate('/contact');
    }
  }

  useEffect(() => {
    verifyPet();
  }, [petPage]);

  useEffect(
    () => {
      setPetPage({});
      getPetData();
    },
    [id],
    [userId]
  );

  useEffect(
    () => {
      getPetData();
    },
    [petModalShow],
    [userId]
  );

  return (
    <div className="main-container petpage">
      <FaChevronCircleLeft
        className="petpage-back"
        onClick={() => navigate(-1)}
      />
      {imgLoading || <LikeButton id={id} />}
      {imgLoading ||
        (user?.isAdmin && (
          <div className="edit">
            <FaEdit onClick={() => navigate(`../admin/edit-pet/${id}`)} />
          </div>
        ))}
      <div className="petpage-image-container">
        {imgLoading && <Spinner />}
        <img
          src={petPage.picture}
          className={imgLoading ? 'petpage-image hide' : 'petpage-image'}
          onLoad={() => {
            setImgLoading(false);
            getPetPage(id);
            verifyPet();
          }}
        />
      </div>
      <div className="petpage-main-card">
        {petPage && <PetDetails petPage={petPage} />}
        {petPage?.adoptionStatus !== 'Available' && (
          <div className="unavailable">
            <div className="unavailable-message">
              This {petPage?.type?.toLowerCase()} has already been{' '}
              {petPage?.adoptionStatus?.toLowerCase()}
              {!myPet &&
                user?.isAdmin &&
                ` by ${petOwner?.firstName} ${petOwner?.lastName}`}{' '}
              {myPet && 'by you'}{' '}
            </div>
            {!myPet && petPage?.adoptionStatus === 'Fostered' && (
              <div className="unavailable-foster">
                Foster families have priority in adoption, but we're always
                happy to hear from potential adopters. If you've got your heart
                set on {petPage?.name}, don't hesitate to
                <span onClick={contactClickHandler}> contact us</span>.
              </div>
            )}
          </div>
        )}
        <div className="petpage-buttons">
          {(petPage?.adoptionStatus === 'Available' ||
            (myPet && petPage.adoptionStatus === 'Fostered')) && (
            <PetButtons
              type={'adopt'}
              id={id}
              pet={petPage?.type.toLowerCase()}
            />
          )}
          {petPage.adoptionStatus === 'Available' && (
            <PetButtons
              type={'foster'}
              id={id}
              pet={petPage?.type.toLowerCase()}
            />
          )}
          {myPet &&
            (petPage.adoptionStatus === 'Adopted' ||
              petPage.adoptionStatus === 'Fostered') && (
              <PetButtons
                type={'return'}
                id={id}
                pet={petPage?.type.toLowerCase()}
              />
            )}
        </div>
      </div>
      <PetModal
        show={petModalShow}
        onHide={() => setPetModalShow(false)}
        pet={petPage.name}
        status={petPage.adoptionStatus}
      />
    </div>
  );
}

export default PetPage;
