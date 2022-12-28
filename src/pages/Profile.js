import UserProfile from '../components/Profile/UserProfile';
import '../scss/Profile.scss';

function Profile() {
  return (
    <div className="profile main-container">
      <h1 className="profile-title">Update your profile</h1>
      <UserProfile />
    </div>
  );
}

export default Profile;
