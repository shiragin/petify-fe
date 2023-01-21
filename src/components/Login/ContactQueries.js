import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';

function ContactQueries({ modalShow }) {
  const { userId, getQueriesbyUserId } = useUserContext();
  const [myQueries, setMyQueries] = useState([]);

  async function getMyQueries() {
    const queries = await getQueriesbyUserId(userId);
    setMyQueries(queries);
  }

  useEffect(() => {
    if (userId) getMyQueries();
    else setMyQueries([]);
  }, [modalShow]);

  return (
    <Accordion defaultActiveKey={['0']}>
      {myQueries
        ?.sort((q1, q2) =>
          !q1.replied && q2.replied
            ? -1
            : q1.replied && !q2.replied
            ? 1
            : new Date(q2.createdAt) - new Date(q1.createdAt)
        )
        .map((query, index) => {
          return (
            <Accordion.Item key={query._id} eventKey={index}>
              <Accordion.Header>
                <div className="message">
                  <div className="message-content">
                    <span className="fw-bold">Your message: </span>{' '}
                    <span>{query.message}</span>
                  </div>
                  <span
                    className={
                      query.replied ? 'replied' : 'replied not-replied'
                    }
                  >
                    {' '}
                    {query.replied ? 'REPLIED' : 'NOT REPLIED'}
                  </span>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                {query.replied ? (
                  <div>
                    {' '}
                    <span className="fw-bold">Our Reply:</span> {query.reply}
                  </div>
                ) : (
                  'Your message has been received. Our diligent team will respond to your inquiry shortly!'
                )}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
    </Accordion>
  );
}

export default ContactQueries;
