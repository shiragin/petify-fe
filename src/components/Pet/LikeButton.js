import React, { useState, useContext } from 'react';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { useUserContext } from '../../libs/UserContext';

function LikeButton() {
  const { user, setLoginModalShow } = useUserContext();
  const [liked, setLiked] = useState(false);

  function likeClickHandler() {
    if (!user.email) {
      return setLoginModalShow({ show: true, type: 'login' });
    }
    setLiked(!liked);
  }

  return (
    <div className="liked" onClick={likeClickHandler}>
      {liked ? <BsSuitHeartFill /> : <BsSuitHeart />}
    </div>
  );
}

export default LikeButton;
