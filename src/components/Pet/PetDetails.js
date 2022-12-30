import { useEffect } from 'react';
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
  } = petPage;

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
