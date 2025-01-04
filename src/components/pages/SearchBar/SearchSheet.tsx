"use client";
import { Search } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import { searchAction } from "./actions/search";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { searchSchema } from "./actions/schemas";
import LoaderSpinner from "@/components/UniversalComponents/LoaderSpinner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CachedSearchResult } from "@/lib/cache/search/getCachedSearch";
import PageCard from "./PageCard";
import { cn } from "@/lib/utils";

export default function SearchSheet({ searchQuery }: { searchQuery?: string }) {
  const tErrors = useTranslations("Errors");
  const tSearch = useTranslations("Search");

  // search results
  const [searchResults, setSearchResults] = useState<
    CachedSearchResult | undefined
  >();

  const searchInputRef = useRef<HTMLInputElement>(null);

  // next-safe-action
  const { execute, status } = useAction(searchAction, {
    onError({ error }) {
      // rate limit exceeded
      if (error.serverError === "RateLimitError") {
        toast(tErrors("rate_limit_title"), {
          description: tErrors("too_many_search_requests"),
        });

        return;
      }

      error.serverError &&
        toast(
          <SonnerErrorCard
            title={tErrors("general_error_title")}
            errors={error.serverError}
          />,
        );
    },

    onSuccess({ data }) {
      // console.log("SEARCH: ", data);
      setSearchResults(data);
    },
  });

  // form values
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchValue: searchQuery ?? "",
      resultsNumber: 20,
    },
  });

  // form submit
  function onSubmit(values: z.infer<typeof searchSchema>) {
    execute(values);
  }

  // processing naviagtion to the url with search param specified
  useEffect(() => {
    if (searchQuery) {
      execute({ searchValue: searchQuery });
    }
  }, []);
  return (
    <Sheet>
      <SheetTrigger
        className="flex w-12 items-center justify-center rounded-2xl border-2 p-2 transition-colors hover:border-accent hover:text-accent"
        title="search"
      >
        <Search />
      </SheetTrigger>
      <SheetContent
        side={"top"}
        className={cn(
          "mx-auto h-40 w-screen max-w-screen-lg p-2",
          searchResults && "h-screen",
        )}
      >
        <SheetTitle className="hidden">{tSearch("search_modal")}</SheetTitle>
        <SheetDescription className="hidden">
          {tSearch("search_modal")}
        </SheetDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="searchValue"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <search className="relative mb-4 mt-12 flex">
                      <Input
                        {...field}
                        ref={searchInputRef}
                        type="text"
                        placeholder={tSearch("placeholder")}
                        className="mx-8 rounded-full border-none bg-primary/20 px-6 py-6 pr-12 ring-1 ring-accent transition-all hover:ring-2 focus-visible:outline-none focus-visible:ring-2"
                        max={100}
                      />
                      <Search className="pointer-events-none absolute right-12 top-3 text-primary-foreground" />
                    </search>
                  </FormControl>
                  <FormMessage className="absolute inset-x-0 top-24 text-center" />
                </FormItem>
              )}
            />
            <button type="submit" className="hidden" aria-hidden>
              {tSearch("submit").toLocaleUpperCase()}
            </button>
          </form>
        </Form>
        <div className="h-[88%] overflow-y-scroll rounded-lg p-2">
          {status === "executing" ? (
            <div className="h-96">
              <LoaderSpinner />
            </div>
          ) : (
            // NOTE asserting simplified useTranslations hook to pass to child component
            // in order to initiate TS support you can temporary use hook inside of the child component
            SearchResults({
              searchResults,
              tSearch: tSearch as (input: string) => string,
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

const SearchResults = ({
  searchResults,
  tSearch,
}: {
  searchResults: CachedSearchResult | undefined;
  tSearch: (input: string) => string;
}) => {
  if (!searchResults) return null;

  // if (searchResults.blogs.length === 0 && searchResults.pages.length === 0)
  if (
    searchResults.blogsWithImages.length === 0 &&
    searchResults.pages.length === 0
  )
    return <p className="text-center">{tSearch("no_results")}</p>;

  // constructing pages results
  const pageCards = searchResults.pages.map((item) => (
    <PageCard
      key={`searchResult${item.id}`}
      path={item.id}
      SheetCloseWrapper={SheetCloseWrapper}
    />
  ));

  // constructing blogs results
  const blogCards = searchResults.blogsWithImages
    // filter is for development mode, when results from Vectorize point to the blogs that do not exsit locally
    .filter((item) => item)
    .map((item) => (
      <BlogCard
        {...item}
        key={`searchResult${item.blog.blogId}`}
        SheetCloseWrapper={SheetCloseWrapper}
      />
    ));

  return (
    <div className="flex flex-col">
      {pageCards.length > 0 && (
        <>
          <h2 className="indent-8">{tSearch("pages")}</h2>
          <div className="grid grid-flow-row gap-1">{pageCards}</div>
        </>
      )}
      {blogCards.length > 0 && (
        <>
          <h2 className="indent-8">{tSearch("blogs")}</h2>
          <div className="grid grid-flow-row gap-1 md:grid-cols-2">
            {blogCards}
          </div>
        </>
      )}
    </div>
  );
};

// attaching SheetClose
const SheetCloseWrapper = ({
  withSheetClose,
  children,
  className,
}: {
  withSheetClose?: boolean;
  children: ReactNode;
  className?: string;
}) => {
  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, undefined];
  return (
    <div className={className}>
      <SheetCloseWrapper {...sheetCloseWrapperProps}>
        {children}
      </SheetCloseWrapper>
    </div>
  );
};
