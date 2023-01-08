import { FaPaw } from 'react-icons/fa';
import { usePetsContext } from '../../context/PetsContext';

function PetDetails() {
  const { petPage } = usePetsContext();

  const {
    name,
    breed,
    colour,
    height,
    weight,
    hypoallergenic,
    adoptionStatus,
    bio,
    age,
    dietry,
  } = petPage;

  console.log(dietry);
  console.log(dietry?.length);

  return (
    <div className="petpage-card">
      <h4 className="petpage-card-title">
        <span>{name}</span>
      </h4>
      <div className="petpage-card-details">
        <div className="petpage-card-details-left">
          <ul>
            <li>
              <span>
                <FaPaw />
                Breed:{' '}
              </span>
              {breed}
            </li>
            <li>
              <span>
                <FaPaw />
                Age:{' '}
              </span>
              {/* {age > 12 ? `${age / 12} years` : `${age} months`} */}
              {age} {age > 1 ? ' years' : ' year'}
            </li>
            <li>
              <span>
                <FaPaw />
                Height:{' '}
              </span>
              {height}cm
            </li>
            <li>
              <span>
                <FaPaw />
                Weight:{' '}
              </span>
              {weight}kg
            </li>
          </ul>
        </div>
        <div className="petpage-card-details-right">
          <ul>
            <li>
              <span>
                <FaPaw />
                Colour:{' '}
              </span>
              {colour && `${colour.join(', ')}`}
            </li>
            <li>
              <span>
                <FaPaw />
                Hypoallergenic:{' '}
              </span>{' '}
              {hypoallergenic ? 'Yes' : 'No'}
            </li>
            <li>
              <span>
                <FaPaw />
                Special Diet:{' '}
              </span>{' '}
              {dietry && dietry[0] ? dietry.join(', ') : 'None'}
            </li>
            <li>
              <span>
                <FaPaw />
                Adoption Status:{' '}
              </span>
              {adoptionStatus}
            </li>
          </ul>
        </div>
      </div>
      <div className="petpage-card-bio">{bio}</div>
    </div>
  );
}

export default PetDetails;
