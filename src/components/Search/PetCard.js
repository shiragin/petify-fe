import { Card } from 'react-bootstrap';
import Cat from '../../imgs/cat-portrait.jpg';
import Dog from '../../imgs/dog-portrait.jpg';

function PetCard(props) {
  const { name, type, breed } = props.value;

  return (
    <Card>
      <Card.Img variant="top" src={type === 'Cat' ? Cat : Dog} />
      <div className="card-content">
        <Card.Title>{name}</Card.Title>
        <Card.Body>
          <div>{breed}</div>
        </Card.Body>
      </div>
    </Card>
  );
}

export default PetCard;
