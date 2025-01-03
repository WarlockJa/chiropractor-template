import { User } from "next-auth";

// returns TRUE if user has a role taht allows them to edit blogs
// otherwise returns FALSE
export default function userCanEditBlog({ user }: { user: User | undefined }) {
  // making it so that any registered user can edit blogs
  return Boolean(user);

  // TODO change in release
  // return user?.role !== "editor" &&
  //   user?.role !== "owner" &&
  //   // TODO remove admin in release
  //   user?.role !== "admin"
  //   ? false
  //   : true;
}
