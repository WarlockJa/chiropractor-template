import { defaultBlurhash } from "@/appConfig";
import { SelectImages } from "@db/schemaImage";
import { atom } from "jotai";
import { TParts } from "../mdxtypes";

// slice index for the edited part
export const sliceIndexAtom = atom<number | undefined>(undefined);

// blog parts for editable MDX post
export const initBlogData: TParts = [
  {
    type: 0,
    title: "",
    description: "",
    imageId: null,
    name: "",
    aria: "",
    previewImage: null,
    blurhash: defaultBlurhash,
    height: 0,
    width: 0,
    sizeBytes: 0,
  },
  {
    type: 999,
    index: 0,
  },
];
export const blogPartsAtom = atom<TParts>(initBlogData);

// DB records list for blog images
export const blogImagesAtom = atom<SelectImages[]>([]);

// list of images used in the blog
export const blogUsedImagesAtom = atom<number[]>([]);

// preventing modal zoom in from triggering for control elements
export const controlActiveAtom = atom<boolean>(false);
