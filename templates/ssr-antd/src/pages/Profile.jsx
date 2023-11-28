import useStore from "../store";

export default function Profile() {
  const { style, user } = useStore();

  console.log(user);
  return (
    <div className="profile-wrapper">
      <div
        style={{
          fontWeight: 200,
          fontSize: 36,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        My Profile
      </div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
