const FOUROFOUR_ICON_PATH = "/assets/img/404.svg";

export default function FourOfour() {
  return (
    <div className="fourofour-wrapper">
      <img className="icon" src={FOUROFOUR_ICON_PATH} />
      <h1 className="fourofour-title">404</h1>
      <p className="fourofour-subtitle">
        Looks like the page you're looking for doesn't exist
      </p>
    </div>
  );
}
