import UserProfile from '../components/Login/UserProfile';
import '../scss/Profile.scss';

function Profile() {
  return (
    <div className="profile main-container">
      <h1 className="profile-title">Update profile</h1>
      <UserProfile />
    </div>
  );
}

export default Profile;
