import React, { useEffect, useState } from 'react';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { useUserContext } from '../../libs/UserContext';

function LikeButton({ id }) {
  const { user, setLoginModalShow, updateUser } = useUserContext();
  const [liked, setLiked] = useState(false);

  function likeClickHandler(e) {
    if (!user.email) {
      return setLoginModalShow({ show: true, type: 'login' });
    } else {
      setLiked(!liked);
      addSavedPet();
    }
  }

  useEffect(() => {
    if (user.savedPets.includes(id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, []);

  // useEffect(() => addSavedPet(), [liked]);

  function addSavedPet() {
    // console.log(user);
    // console.log(liked);
    if (!liked) {
      console.log(id);
      if (!user?.savedPets.includes(id)) user.savedPets.push(id);
      console.log(user.savedPets);
    } else {
      console.log('GGGGGG');
      console.log(id);
      console.log(user.savedPets);
      if (user?.savedPets.includes(id)) {
        user.savedPets = user.savedPets.filter((el) => el !== id);
      }
      console.log(user.savedPets);
      console.log(user);
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
