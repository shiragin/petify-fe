import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Cat from '../../imgs/cat-portrait.jpg';
import Dog from '../../imgs/dog-portrait2.jpg';

function PetCard({ value }) {
  const { _id, name, type, breed } = value;

  const navigate = useNavigate();

  function cardClickHandler() {
    navigate(`/pet?id=${_id}`);
  }

  return (
    <Card onClick={cardClickHandler}>
      <Card.Img variant="top" src={type === 'Cat' ? Cat : Dog} />
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
