import React, { useEffect, useState } from "react";

function UserList () {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/user")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching the data', error));
    }, []);
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.userId}>
                        {user.name} ({user.email}) - {user.userRoleName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;