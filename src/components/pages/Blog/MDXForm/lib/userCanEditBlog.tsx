import { User } from "next-auth";

export default function userCanEditBlog({ user }: { user: User | undefined }) {
  return user?.role !== "editor" &&
    user?.role !== "owner" &&
    // TODO remove admin in release
    user?.role !== "admin"
    ? false
    : true;
}
