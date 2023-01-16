import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { FaChevronCircleLeft } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ShowQuery({ id, setShowQuery }) {
  const { getQuery, updateQuery } = useUserContext();

  const [query, setQuery] = useState({});
  const [reply, setReply] = useState('');

  const navigate = useNavigate();

  async function getCurrentQuery(id) {
    const currentQuery = await getQuery(id);
    setQuery(currentQuery);
  }

  async function replyClickHandler() {
    const newQuery = await updateQuery(id, { reply });
    setQuery(newQuery.query);
  }

  useEffect(() => {
    getCurrentQuery(id);
  }, []);

  return (
    <div className="user-page">
      <FaChevronCircleLeft
        className="petpage-back userpage-back"
        onClick={() => {
          setShowQuery({ show: false });
          navigate('/admin/show-queries');
        }}
      />
      <h2 className="user-title">User Query</h2>
      <div className="user-details">
        <div>
          <span className="title">Date</span>{' '}
          {new Date(query?.createdAt).toLocaleString('en-GB')}
        </div>
        <div>
          <span className="title">Name</span> {query?.name}
        </div>
        <div>
          <span className="title">Email</span> {query?.email}
        </div>
        <div>
          <span className="title">Registered</span>{' '}
          {query?.userId ? 'Yes' : 'No'}
        </div>
        <div>
          <span className="title">Topic</span> {query?.topic}
        </div>
        {query?.replied && (
          <div>
            <span className="title">Reply Date</span>{' '}
            {new Date(query?.repliedAt).toLocaleString('en-GB')}
          </div>
        )}
        <div>
          <span className="title">Message</span>
          <div className="message">{query?.message}</div>
        </div>
        <div>
          <span className="title">Our Reply</span>
          <div className="message">{query?.reply}</div>
        </div>
        {!query.replied && (
          <Form.Control
            as="textarea"
            rows={6}
            className="pet-input"
            type="textarea"
            name="reply"
            value={reply}
            required
            placeholder="Please reply politely and helpfully to the user's inquiry..."
            onChange={(e) => setReply(e.target.value)}
          />
        )}
        {!query?.replied && (
          <Button
            className="btn btn-skew-left login-submit-button"
            onClick={replyClickHandler}
          >
            <span>Reply to this query</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default ShowQuery;
