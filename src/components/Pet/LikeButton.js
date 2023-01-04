import React, { useEffect, useState } from 'react';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { usePetsContext } from '../../context/PetsContext';
import { useUserContext } from '../../context/UserContext';

function LikeButton({ id }) {
  const { user, setLoginModalShow, updateUser, setUser } = useUserContext();
  const { savedPets, addSavedPet, deleteSavedPet } = usePetsContext();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!user) return;
    console.log('HII', user);
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
      handleSavedPet();
    }
  }

  async function handleSavedPet() {
    if (!user) return;
    console.log(liked);
    if (!liked) {
      if (!user?.savedPets?.includes(id)) {
        user.savedPets.push(id);
        const update = await addSavedPet(id, user._id, user);
        update && console.log('pet added to saved');
        console.log('UPDATE', update);
      }
    } else {
      if (user?.savedPets?.includes(id)) {
        user.savedPets = user.savedPets.filter((el) => el !== id);
        console.log(user.savedPets);
        const update = await deleteSavedPet(id, user._id, user);
        // update && console.log('pet deleted from saved');
        // console.log('UPDATE', update);
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
