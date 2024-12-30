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
import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchCard from "./SearchCard";
import { CachedBlog } from "@/lib/cache/blog/getCachedBlog";
import { searchAction } from "./actions/search";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { searchSchema } from "./actions/schemas";
import LoaderSpinner from "@/components/UniversalComponents/LoaderSpinner";

export default function SearchBar({ searchQuery }: { searchQuery?: string }) {
  const t = useTranslations("Errors");

  // search results
  const [searchResults, setSearchResults] = useState<
    CachedBlog[] | undefined
  >();
  // process.env.NODE_ENV === "production" ? undefined : TEMP_DATA,
  // popup open/close trigger ref
  const popupTriggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  // tracking search results menu open state
  const [searchOpen, setSearchOpen] = useState(false);

  // next-safe-action
  const { execute, status } = useAction(searchAction, {
    onError({ error }) {
      // rate limit exceeded
      if (error.serverError === "RateLimitError") {
        toast(t("rate_limit_title"), {
          description: "Too many search requests. Try again later.",
        });

        return;
      }

      error.serverError &&
        toast(
          <SonnerErrorCard
            title={t("general_error_title")}
            errors={error.serverError}
          />,
        );
    },

    onSuccess({ data }) {
      console.log("SEARCH: ", data);
      setSearchResults(data);
    },
  });

  // form values
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchValue: searchQuery ?? "",
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
    <div className="sticky top-1 z-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-full"
        >
          <FormField
            control={form.control}
            name="searchValue"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <search className="relative mx-auto w-full max-w-2xl">
                    <Input
                      {...field}
                      ref={searchInputRef}
                      type="text"
                      placeholder={"Find what you like..."}
                      className="rounded-full border-none bg-primary/20 px-6 py-6 pr-12 transition-all hover:outline-none hover:ring-2 hover:ring-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
                      max={100}
                      onClick={() => {
                        if (searchOpen) return;

                        searchResults && popupTriggerRef.current?.click();
                      }}
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 transform text-primary-foreground" />
                  </search>
                </FormControl>
                <FormMessage className="absolute -bottom-5 left-0 right-0 text-center" />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="hidden"
            aria-hidden
            onClick={() => {
              if (searchOpen) return;

              searchResults && popupTriggerRef.current?.click();
            }}
          >
            SUBMIT
          </button>
        </form>
      </Form>
      <Popover onOpenChange={(e) => setSearchOpen(e)}>
        <PopoverTrigger
          ref={popupTriggerRef}
          className="mx-auto w-full"
        ></PopoverTrigger>
        <PopoverContent
          className="grid max-h-96 w-full max-w-screen-lg grid-flow-row grid-cols-2 gap-1 overflow-y-scroll rounded-lg border-2 border-foreground bg-secondary/60"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {status === "executing" ? (
            <div className="h-96 w-screen max-w-screen-lg">
              <LoaderSpinner />
            </div>
          ) : (
            searchResults &&
            searchResults.map((item) => (
              <SearchCard key={`searchResult${item.blog.blogId}`} {...item} />
            ))
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
