import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { BsEyeFill } from 'react-icons/bs';
import { usePetsContext } from '../../context/PetsContext';

function DashboardLine({ value, id, list }) {
  const { getPets, pets, petEditModalShow, setPetEditModalShow } =
    usePetsContext();

  const navigate = useNavigate();

  return (
    <tr className="show-pets-list-line">
      {Object.keys(value).map((key) => (
        <td key={key}>{value[key]}</td>
      ))}
      {list === 'pets' && (
        <td onClick={() => navigate(`../pet/${id}`)}>
          <BsEyeFill />
        </td>
      )}
      {list === 'users' && (
        <td onClick={() => navigate(`../admin/profile/${id}`)}>
          <BsEyeFill />
        </td>
      )}
      {list === 'pets' && (
        <td>
          <FaEdit onClick={() => navigate(`../admin/edit-pet/${id}`)} />
        </td>
      )}
    </tr>
  );
}

export default DashboardLine;
