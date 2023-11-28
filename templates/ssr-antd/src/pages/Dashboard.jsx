import useStore from "../store";
import { getUsers } from "../api";
import { useEffect } from "react";

function createTableData(name, companyName, email, address, phone) {
  return { name, companyName, email, address, phone };
}

export default function Dashboard() {
  const { style, users, updateUsers } = useStore();

  const fetchUsers = async () => {
    const data = await getUsers();
    updateUsers(data); 
  };

  useEffect(() => {
    // Fetch new data if posts are not already fetched
    if (!users) {
      fetchUsers();
    }
  }, []);

  const clients = users?.map((client) => {
    const {
      name,
      company: { name: companyName },
      address: { street, city },
      email,
      phone,
    } = client;
    return createTableData(name, companyName, email, street + "" + city, phone);
  });

  return (
    <>
      <div
        style={{
          fontWeight: 200,
          fontSize: 36,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Dashboard
      </div>
    </>
  );
}
