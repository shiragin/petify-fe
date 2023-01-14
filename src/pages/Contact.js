import ContactForm from '../components/Login/ContactForm';
import '../scss/Profile.scss';

function Contact() {
  return (
    <div className="main-container">
      <h1 className="profile-title">Contact Us</h1>
      <ContactForm />
    </div>
  );
}

export default Contact;
