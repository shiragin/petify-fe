import React, { useEffect, useState } from 'react';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { usePetsContext } from '../../context/PetsContext';
import { useUserContext } from '../../context/UserContext';

function LikeButton({ id }) {
  const { user, userId, setLoginModalShow, updateUser, setUser } =
    useUserContext();
  const { savedPets, addSavedPet, deleteSavedPet } = usePetsContext();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (user?.savedPets?.includes(id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user]);

  function likeClickHandler(e) {
    if (!user?.email) {
      return setLoginModalShow({ show: true, type: 'login' });
    } else {
      setLiked(!liked);
      handleSavedPet();
    }
  }

  async function handleSavedPet() {
    if (!userId) return;
    if (!liked) {
      if (!user?.savedPets?.includes(id)) {
        user.savedPets.push(id);
        console.log('SAVED', user.savedPets);
        const update = await addSavedPet(user._id, user.savedPets);
        update && console.log('pet added to saved');
      }
    } else {
      if (user?.savedPets?.includes(id)) {
        user.savedPets = user.savedPets.filter((el) => el !== id);
        console.log('DELETED', user.savedPets);
        const update = await deleteSavedPet(user._id, user.savedPets);
        update && console.log('pet deleted from saved');
      }
    }
  }

  return (
    <div className="liked" onClick={(e) => likeClickHandler(e)}>
      {liked ? <BsSuitHeartFill /> : <BsSuitHeart />}
    </div>
  );
}

export default LikeButton;
