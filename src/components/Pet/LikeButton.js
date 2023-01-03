import React, { useEffect, useState } from 'react';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { usePetsContext } from '../../context/PetsContext';
import { useUserContext } from '../../context/UserContext';

function LikeButton({ id }) {
  const { user, setLoginModalShow, updateUser } = useUserContext();
  const { savedPets } = usePetsContext();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (user?.savedPets?.includes(id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [savedPets]);

  useEffect(() => {
    if (!user) return;
    if (user?.savedPets?.includes(id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user]);

  function likeClickHandler(e) {
    if (!user) return;
    if (!user?.email) {
      return setLoginModalShow({ show: true, type: 'login' });
    } else {
      setLiked(!liked);
      addSavedPet();
    }
  }

  function addSavedPet() {
    if (!user) return;
    if (!liked) {
      if (!user?.savedPets?.includes(id)) user.savedPets.push(id);
    } else {
      if (user?.savedPets?.includes(id)) {
        user.savedPets = user.savedPets.filter((el) => el !== id);
      }
    }
    const update = updateUser(user._id);
    update && console.log('petAdded');
  }

  return (
    <div className="liked" onClick={(e) => likeClickHandler(e)}>
      {liked ? <BsSuitHeartFill /> : <BsSuitHeart />}
    </div>
  );
}

export default LikeButton;
