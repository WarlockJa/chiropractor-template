import getSession from "@/lib/db/getSession";
import NavMenu from "./NavMenu/NavMenu";
import SheetMenu from "./SheetMenu/SheetMenu";
import { brandName } from "@/appConfig";
import Link from "next/link";
import CustomImage from "@/components/CustomImage";
import NavBarClient from "./NavBarClient/NavBarClient";

export default async function NavBar() {
  try {
    // deduped auth
    const session = await getSession();
    const user = session?.user;

    return (
      <NavBarClient>
        {/* LOGO */}
        <Link
          href={"/"}
          className="flex items-center gap-2 text-2xl xsm:mx-4"
          aria-label="home page"
        >
          <div className="h-12 w-12">
            <CustomImage dbImageName={"o3uowmy2saktgyo5d7u6iu3m-icon.webp"} />
          </div>
          {brandName}
        </Link>

        {/* Authentication and Mobile Menu */}
        <div className="ml-auto flex items-center gap-8 xsm:mr-4">
          <NavMenu />
          <SheetMenu user={user} />
        </div>
      </NavBarClient>
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
}
