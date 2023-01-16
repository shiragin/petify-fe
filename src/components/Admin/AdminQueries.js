import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';
import DashboardLine from './DashboardLine';

function AdminQueries({ setShowQuery }) {
  const { getAllQueries } = useUserContext();
  const [queries, setQueries] = useState([]);

  async function getQueries() {
    const allQueries = await getAllQueries();
    console.log(allQueries);
    if (allQueries) setQueries(allQueries);
  }

  useEffect(() => {
    getQueries();
  }, []);

  return (
    <Table borderless hover className="show-pets-list">
      <thead>
        <tr className="show-pets-list-line-heading">
          <th>Name</th>
          <th>Email</th>
          <th>Subject</th>
          <th>Replied?</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {queries
          .sort((q1, q2) =>
            !q1.replied && q2.replied
              ? -1
              : q1.replied && !q2.replied
              ? 1
              : new Date(q2.createdAt) - new Date(q1.createdAt)
          )
          .map(({ _id, name, email, topic, replied }) => {
            return (
              <DashboardLine
                key={_id}
                value={{ name, email, topic }}
                id={_id}
                replied={replied}
                list={'queries'}
                setShowQuery={setShowQuery}
              />
            );
          })}
      </tbody>
    </Table>
  );
}

export default AdminQueries;
