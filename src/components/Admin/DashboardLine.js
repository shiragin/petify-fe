import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { BsEyeFill } from 'react-icons/bs';
import { ImCross, ImCheckmark } from 'react-icons/im';

function DashboardLine({ value, id, list, replied, setShowUser }) {
  const navigate = useNavigate();

  return (
    <tr className="show-pets-list-line">
      {Object.keys(value).map((key) => (
        <td key={key}>{value[key]}</td>
      ))}
      {list === 'queries' && (
        <td>
          {replied ? (
            <ImCheckmark className="sm" />
          ) : (
            <ImCross className="sm" />
          )}
        </td>
      )}
      {list === 'queries' && (
        <td onClick={() => navigate(`../admin/show-queries/${id}`)}>
          <BsEyeFill className="lg" />
        </td>
      )}
      {list === 'pets' && (
        <td onClick={() => navigate(`../pet/${id}`)}>
          <BsEyeFill />
        </td>
      )}
      {list === 'users' && (
        <td onClick={() => setShowUser({ show: true, id })}>
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
