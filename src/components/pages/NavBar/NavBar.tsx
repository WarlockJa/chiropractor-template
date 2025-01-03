import getSession from "@/lib/db/getSession";
import NavMenu from "./NavMenu/NavMenu";
import SheetMenu from "./SheetMenu/SheetMenu";
import { brandName } from "@/appConfig";
import Link from "next/link";
import NavBarClient from "./NavBarClient/NavBarClient";
import ContactsPanel from "./ContactsPanel/ContactsPanel";
import SearchSheet from "../SearchBar/SearchSheet";

export default async function NavBar() {
  try {
    // deduped auth
    const session = await getSession();
    const user = session?.user;

    return (
      <div className="fixed left-0 right-0 top-0 z-40 flex flex-col">
        <NavBarClient>
          <div className="flex w-full items-center justify-between">
            {/* LOGO */}
            <Link
              href={"/"}
              className="flex items-center gap-2 text-2xl xsm:mx-4"
              aria-label="home page"
            >
              <div className="h-20 w-20">
                <img
                  src="/logo_alpha_pink.png"
                  alt="chiropractor logo"
                  className="object-contain"
                />
              </div>
              <div className="hidden md:block">{brandName}</div>
            </Link>

            {/* Authentication and Mobile Menu */}
            <div className="ml-auto flex items-center gap-8 xsm:mr-4">
              <NavMenu />
              <SearchSheet />
              <SheetMenu user={user} />
            </div>
          </div>

          <div className="hidden items-center justify-center gap-2 md:flex 2xl:gap-8">
            {/* Contact bar */}
            <ContactsPanel />
          </div>
        </NavBarClient>
        <ContactsPanel className="fixed inset-x-0 bottom-0 border-t bg-background/90 transition-opacity md:hidden" />
      </div>
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
}
