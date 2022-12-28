import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { TbArrowBigRight } from 'react-icons/tb';
import { useUserContext } from '../../libs/UserContext';

function PetButtons({ type }) {
  const { user, loggedIn, setLoginModalShow } = useUserContext();
  const [buttonType, setButtonType] = useState({});

  useEffect(() => {
    if (type === 'adopt') {
      setButtonType({
        type: 'adopt',
        text: 'Adopt Pet',
        handler: adoptPetHandler,
      });
    } else if (type === 'foster') {
      setButtonType({
        type: 'foster',
        text: 'Foster Pet',
        handler: fosterPetHandler,
      });
    } else {
      setButtonType({
        type: 'return',
        text: 'Return Pet',
        handler: returnPetHandler,
      });
    }
  }, []);

  function checkLogIn() {
    if (!user) return;
    if (!user?.email) {
      setLoginModalShow({ show: true, type: 'login' });
      return false;
    } else {
      return true;
    }
  }

  function adoptPetHandler() {
    if (!checkLogIn()) return;
    console.log('adopt');
  }
  function fosterPetHandler() {
    if (!checkLogIn()) return;
    console.log('foster');
  }
  function returnPetHandler() {
    if (!checkLogIn()) return;
    console.log('return');
  }

  return (
    <Button className="petpage-button" onClick={buttonType.handler}>
      <TbArrowBigRight />
      {buttonType.text}
    </Button>
  );
}

export default PetButtons;
