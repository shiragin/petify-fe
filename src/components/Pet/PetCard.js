import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';
import LikeButton from './LikeButton';

function PetCard({ value }) {
  const { _id, name, breed, adoptionStatus, picture } = value;

  const [imgLoading, setImgLoading] = useState(true);

  const navigate = useNavigate();

  function cardClickHandler(e) {
    if (e.target.tagName === 'svg' || e.target.tagName == 'path') return;
    navigate(`/pet/${_id}`);
  }

  return (
    <Card onClick={cardClickHandler}>
      <div className="corner">
        <span>{adoptionStatus}</span>
      </div>
      <LikeButton id={_id} />
      {imgLoading && <Spinner />}
      <Card.Img
        variant="top"
        src={picture}
        className={imgLoading && 'hide'}
        onLoad={() =>
          setTimeout(() => {
            setImgLoading(false);
          }, 500)
        }
      />

      <div className="card-content">
        <div>
          <Card.Title>{name}</Card.Title>
          <Card.Body>
            <div>{breed}</div>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}

export default PetCard;
