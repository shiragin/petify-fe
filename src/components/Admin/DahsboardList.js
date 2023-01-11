import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { usePetsContext } from '../../context/PetsContext';
import { useUserContext } from '../../context/UserContext';
import DashboardLine from './DashboardLine';
import DashboardModal from './DashboardModal';

function DahsboardList({ list, setShowUser }) {
  const { getPets, pets } = usePetsContext();
  const { getAllUsers } = useUserContext();

  const [userModalShow, setUserModalShow] = useState({ show: false, id: '' });

  const [users, setUsers] = useState([]);

  async function getUsersData() {
    const usersList = await getAllUsers();
    setUsers(usersList);
  }

  useEffect(() => {
    if (list === 'pets') {
      getPets();
    } else if (list === 'users') {
      getUsersData();
    }
  }, []);

  function modalShowHandler(show, id) {
    setUserModalShow({ show: true, id: id });
  }

  return (
    <Table borderless hover className="show-pets-list">
      {/* <DashboardModal
        show={userModalShow.show}
        id={userModalShow.id}
        onHide={() => setUserModalShow({ show: false })}
      /> */}
      <thead>
        {list === 'pets' && (
          <tr className="show-pets-list-line-heading">
            <th>Name</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Status</th>
            <th>View</th>
            <th>Edit</th>
          </tr>
        )}
        {list === 'users' && (
          <tr className="show-pets-list-line-heading">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>View</th>
          </tr>
        )}
      </thead>
      {list === 'pets' && (
        <tbody>
          {pets
            .sort((pet1, pet2) => (pet1.name > pet2.name ? 1 : -1))
            .map(({ _id, name, type, breed, adoptionStatus }) => (
              <DashboardLine
                key={_id}
                value={{ name, type, breed, adoptionStatus }}
                id={_id}
                list={list}
              />
            ))}
        </tbody>
      )}
      {list === 'users' && users && (
        <tbody>
          {users
            .sort((user1, user2) =>
              user1.firstName > user2.firstName ? 1 : -1
            )
            .map(({ _id, firstName, lastName, email, phoneNumber }) => (
              <DashboardLine
                key={_id}
                value={{ firstName, lastName, email, phoneNumber }}
                id={_id}
                list={list}
                setShowUser={setShowUser}

                // onModalShow={(show, id) => modalShowHandler(show, id)}
              />
            ))}
        </tbody>
      )}
    </Table>
  );
}

export default DahsboardList;
