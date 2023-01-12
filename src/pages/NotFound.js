import NotFoundKitten from '../imgs/not-found.png';

function NotFound() {
  return (
    <div className="main-container container-not-found">
      <img src={NotFoundKitten} />
      <div className="not-found">
        <h1 className="profile-title">404: Cuteness Overload!</h1>
        <p className="not-found-text">
          Whoops! the page you're looking for has been lost in a sea of adorable
          kittens. But don't worry, just use the navigation to find your way
          back to your new pet companion.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
