const PROTECTED_ICON_PATH = "/assets/img/protected.svg";

export default function Protected() {
  return (
    <div className="protected-wrapper">
      <img className="icon" src={PROTECTED_ICON_PATH} />
      <h1 className="protected-title">Protected route</h1>
      <p className="protected-subtitle">
        You must be logged in to access this link
      </p>
    </div>
  );
}
