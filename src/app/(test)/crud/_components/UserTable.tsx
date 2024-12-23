import { users } from "@db/schemaAuth";
import { ChangeUserRole } from "./ChangeUserRole";
import { DeleteUser } from "./DeleteUser";
import { db } from "@db/db-connection";

export default async function UserTable() {
  const data = await db.select().from(users).all();
  return data.length > 0 ? (
    <ul>
      {data.map((user) => (
        <li className="flex gap-2" key={user.id}>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.role}</div>
          <div>{user.emailVerified?.toString()}</div>
          <ChangeUserRole
            email={user.email}
            role={user.role ? null : "admin"}
          />
          <DeleteUser email={user.email} />
        </li>
      ))}
    </ul>
  ) : (
    <div>No users found in the database</div>
  );
}
