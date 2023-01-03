import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { BsEyeFill } from 'react-icons/bs';
import { usePetsContext } from '../../context/PetsContext';

function PetLine({ value, id }) {
  const { getPets, pets, petEditModalShow, setPetEditModalShow } =
    usePetsContext();

  const navigate = useNavigate();

  return (
    <tr className="show-pets-list-line">
      {Object.keys(value).map((key) => (
        <td key={key}>{value[key]}</td>
      ))}
      <td onClick={() => navigate(`../pet/${id}`)}>
        <BsEyeFill />
      </td>
      <td>
        <FaEdit onClick={() => navigate(`../admin/edit-pet/${id}`)} />
      </td>
    </tr>
  );
}

export default PetLine;
