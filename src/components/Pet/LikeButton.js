import React, { useState } from 'react';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';

function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="liked" onClick={() => setLiked(!liked)}>
      {liked ? <BsSuitHeartFill /> : <BsSuitHeart />}
    </div>
  );
}

export default LikeButton;
