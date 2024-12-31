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

const SEARCH_RESULT = [
  {
    blog: {
      blogId: 1,
      owner: "ksknwibg2z9ayrf6oi6dl0vf",
      createdAt: "2024-12-30T11:35:36.000Z",
      updatedAt: "2024-12-30T11:41:35.000Z",
      title: "Usain Bolt",
      description: "Usain St. Leo Bolt (born 21 August 1986)",
      previewImage: 30,
      published: false,
      mdx: '[{"type":0,"title":"Usain Bolt","description":"Usain St. Leo Bolt (born 21 August 1986)","imageId":30},{"type":999,"index":0},{"type":1,"text":"is a Jamaican retired [sprinter](https://en.wikipedia.org/wiki/Sprint_\\\\(running\\\\) \\"Sprint (running)\\") who is widely considered to be the greatest sprinter of all time.[<sup>\\\\[13\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-15)[<sup>\\\\[14\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-16)[<sup>\\\\[15\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-:1-17) He is an eight-time [Olympic gold medalist](https://en.wikipedia.org/wiki/List_of_multiple_Olympic_gold_medalists \\"List of multiple Olympic gold medalists\\") and the world record holder in the [100 metres](https://en.wikipedia.org/wiki/100_metres \\"100 metres\\"), [200 metres](https://en.wikipedia.org/wiki/200_metres \\"200 metres\\"), and [4 × 100 metres relay](https://en.wikipedia.org/wiki/4_%C3%97_100_metres_relay \\"4 × 100 metres relay\\").\\n\\nBolt is the only sprinter to win [Olympic 100 m](https://en.wikipedia.org/wiki/100_metres_at_the_Olympics \\"100 metres at the Olympics\\") and [200 m](https://en.wikipedia.org/wiki/200_metres_at_the_Olympics \\"200 metres at the Olympics\\") titles at three consecutive Olympics (2008, 2012, and 2016). He also won two 4 × 100 relay gold medals. He gained worldwide fame for his double sprint victory in world record times at the [2008 Beijing Olympics](https://en.wikipedia.org/wiki/2008_Summer_Olympics \\"2008 Summer Olympics\\"), which made him the first person to hold both records since [fully automatic time](https://en.wikipedia.org/wiki/Fully_automatic_time \\"Fully automatic time\\") became mandatory.\\n\\nAn eleven-time [World Champion](https://en.wikipedia.org/wiki/World_Championships_in_Athletics \\"World Championships in Athletics\\"), he won consecutive [World Championship 100 m](https://en.wikipedia.org/wiki/100_metres_at_the_World_Championships_in_Athletics \\"100 metres at the World Championships in Athletics\\"), [200 m](https://en.wikipedia.org/wiki/200_metres_at_the_World_Championships_in_Athletics \\"200 metres at the World Championships in Athletics\\") and [4 × 100 metres relay](https://en.wikipedia.org/wiki/4_%C3%97_100_metres_relay_at_the_World_Championships_in_Athletics \\"4 × 100 metres relay at the World Championships in Athletics\\") gold medals from 2009 to 2015, with the exception of a 100 m [false start](https://en.wikipedia.org/wiki/False_start \\"False start\\") in 2011. He is the [most successful male athlete](https://en.wikipedia.org/wiki/IAAF_World_Championships_in_Athletics#Multiple_medallist \\"IAAF World Championships in Athletics\\") of the World Championships. Bolt is the first athlete to win four World Championship titles in the 200 m and is one of the most successful in the 100 m with three titles, being the first person to run sub-9.7s and sub-9.6s races.\\n\\nBolt improved upon his second [100 m world record](https://en.wikipedia.org/wiki/Men%27s_100_metres_world_record_progression \\"Men\'s 100 metres world record progression\\") of 9.69 with 9.58 seconds in 2009 – the biggest improvement since the start of electronic timing. He has twice broken the [200 metres world record](https://en.wikipedia.org/wiki/Men%27s_200_metres_world_record_progression \\"Men\'s 200 metres world record progression\\"), setting 19.30 in 2008 and 19.19 in 2009. He has helped Jamaica to three [4 × 100 metres relay world records](https://en.wikipedia.org/wiki/Men%27s_4_%C3%97_100_metres_relay_world_record_progression \\"Men\'s 4 × 100 metres relay world record progression\\"), with the current record being 36.84 seconds set in 2012. Bolt\'s most successful event is the 200 m, with three Olympic and four World titles. The 2008 Olympics was his international debut over 100 m; he had earlier won numerous 200 m medals (including [2007 World Championship](https://en.wikipedia.org/wiki/2007_World_Championships_in_Athletics \\"2007 World Championships in Athletics\\") silver) and held the [world under-20](https://en.wikipedia.org/wiki/List_of_world_junior_records_in_athletics \\"List of world junior records in athletics\\") and [world under-18 records](https://en.wikipedia.org/wiki/List_of_world_youth_bests_in_athletics \\"List of world youth bests in athletics\\") for the event until being surpassed by [Erriyon Knighton](https://en.wikipedia.org/wiki/Erriyon_Knighton \\"Erriyon Knighton\\") in 2021.\\n\\nHis achievements as a sprinter have earned him the media nickname \\"Lightning Bolt\\", and his awards include the [IAAF World Athlete of the Year](https://en.wikipedia.org/wiki/IAAF_World_Athlete_of_the_Year \\"IAAF World Athlete of the Year\\"), [Track & Field Athlete of the Year](https://en.wikipedia.org/wiki/Track_%26_Field_Athlete_of_the_Year \\"Track & Field Athlete of the Year\\"), [BBC Overseas Sports Personality of the Year](https://en.wikipedia.org/wiki/BBC_Overseas_Sports_Personality_of_the_Year \\"BBC Overseas Sports Personality of the Year\\") (three times), and [Laureus World Sportsman of the Year](https://en.wikipedia.org/wiki/Laureus_World_Sports_Award_for_Sportsman_of_the_Year \\"Laureus World Sports Award for Sportsman of the Year\\") (four times). Bolt was included in [*Time* magazine\'s 100 Most Influential People](https://en.wikipedia.org/wiki/TIME_Magazine%27s_100_most_influential_people_of_2004 \\"TIME Magazine\'s 100 most influential people of 2004\\") of 2016.[<sup>\\\\[16\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-18) Bolt retired after the [2017 World Championships](https://en.wikipedia.org/wiki/2017_World_Championships_in_Athletics \\"2017 World Championships in Athletics\\"), when he finished third in his last solo 100 m race, opted out of the 200 m, and pulled up injured in the 4×100 m relay final.","title":"Usain St. Leo Bolt"},{"type":999,"index":2},{"type":1,"text":"Usain St. Leo Bolt was born on 21 August 1986 to parents Wellesley and Jennifer Bolt[<sup>\\\\[10\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-IAAFProfile-12) in [Sherwood Content](https://en.wikipedia.org/wiki/Sherwood_Content \\"Sherwood Content\\"),[<sup>\\\\[17\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-guardian1-19) a small town in Jamaica. Jennifer named her son Usain at the suggestion of her nephew-in-law, who suggested the name as he had a classmate of that name, while Bolt\'s middle name, St. Leo, was given to him by his aunt.[<sup>\\\\[18\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-20) He has a brother, Sadiki,[<sup>\\\\[19\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-21) and a sister, Sherine.[<sup>\\\\[20\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-Helps-22)[<sup>\\\\[21\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-si-23) His parents ran the local grocery store in the rural area, and Bolt spent his time playing [cricket](https://en.wikipedia.org/wiki/Cricket_\\\\(sport\\\\) \\"Cricket (sport)\\") and [football](https://en.wikipedia.org/wiki/Association_football \\"Association football\\") in the street with his brother,[<sup>\\\\[22\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-24) later saying, \\"When I was young, I didn\'t really think about anything other than sports.\\"[<sup>\\\\[23\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-BrillBolt-25) As a child, Bolt attended Waldensia Primary, where he began showing his sprinting potential when he ran in his parish\'s annual national primary school meet.[<sup>\\\\[1\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-Focus-1) By the age of twelve, Bolt had become the school\'s fastest runner over the [100 metres](https://en.wikipedia.org/wiki/100_metres \\"100 metres\\") distance.[<sup>\\\\[24\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-26) Bolt also developed an affection for [European](https://en.wikipedia.org/wiki/Europe \\"Europe\\") football teams [Real Madrid](https://en.wikipedia.org/wiki/Real_Madrid_CF \\"Real Madrid CF\\") and [Manchester United](https://en.wikipedia.org/wiki/Manchester_United_F.C. \\"Manchester United F.C.\\").[<sup>\\\\[15\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-:1-17)\\n\\nUpon his entry to [William Knibb Memorial High School](https://en.wikipedia.org/wiki/William_Knibb_Memorial_High_School \\"William Knibb Memorial High School\\"), Bolt continued to focus on other sports, but his cricket coach noticed Bolt\'s speed on the pitch and urged him to try track and field events.[<sup>\\\\[25\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-BBC10-27) [Pablo McNeil](https://en.wikipedia.org/wiki/Pablo_McNeil \\"Pablo McNeil\\"), a former Olympic sprint athlete,[<sup>\\\\[26\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-McNeil-28) and Dwayne Jarrett coached Bolt,[<sup>\\\\[27\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-Jarrett-29) encouraging him to focus his energy on improving his athletic abilities. The school had a history of success in athletics with past students, including sprinter [Michael Green](https://en.wikipedia.org/wiki/Michael_Green_\\\\(sprinter\\\\) \\"Michael Green (sprinter)\\").[<sup>\\\\[1\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-Focus-1) Bolt won his first annual [high school championships](https://en.wikipedia.org/wiki/Inter-Secondary_Schools_Boys_and_Girls_Championships \\"Inter-Secondary Schools Boys and Girls Championships\\") medal in 2001; he took the silver medal in the [200 metres](https://en.wikipedia.org/wiki/200_m \\"200 m\\") with a time of 22.04 seconds.[<sup>\\\\[1\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-Focus-1) McNeil soon became his primary coach, and the two enjoyed a positive partnership, although McNeil was occasionally frustrated by Bolt\'s lack of dedication to his training and his penchant for practical jokes.[<sup>\\\\[26\\\\]</sup>](https://en.wikipedia.org/wiki/Usain_Bolt#cite_note-McNeil-28)","title":"Early years"},{"type":999,"index":4}]',
      views: 0,
    },
    owner: {
      name: "Roman Stepanov",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJIMBhtYWXt49guHqn4S-c40U7H90u4gEJP2m6QrSmgnWuPAag=s96-c",
    },
  },
];

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
