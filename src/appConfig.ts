import { env } from "./lib/env.mjs";

// namings
export const brandName = "CHIROPRACTOR";
export const brandAddress = [
  "77 Massachusetts Ave ",
  "Cambridge, MA 02139 ",
  "United States",
];
export const brandEmail = "roman.s@warlockja.com";
export const brandPhone = { number: "5555555555", string: "555 555-55-55" };
export const brandWhatsApp = { number: "5310884191", string: "531 088 4191" };
export const brandWorkHours = "9:00 - 18:00 / ";

export const brandNoReplyEmail = "no-reply@warlockja.com";
export const brandCoordinates = {
  lat: 42.36096175381038,
  lng: -71.0941526493546,
};
export const brandMapDirectionsLink =
  "https://www.google.com/maps/dir//Massachusetts+Institute+of+Technology,+77+Massachusetts+Ave,+Cambridge,+MA+02139,+United+States/@42.360091,-71.2465953,12z/data=!3m1!5s0x89e370aa6bd83625:0x217abf15aa96779e!4m18!1m8!3m7!1s0x89e370aaf51a6a87:0xd0e08ea5b308203c!2sMassachusetts+Institute+of+Technology!8m2!3d42.360091!4d-71.09416!15sCgNNSVRaBSIDbWl0kgEKdW5pdmVyc2l0eeABAA!16zL20vMDRyd3g!4m8!1m0!1m5!1m1!1s0x89e370aaf51a6a87:0xd0e08ea5b308203c!2m2!1d-71.09416!2d42.360091!3e2?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D";
export const brandPlaceId = "ChIJh2oa9apw44kRPCAIs6WO4NA";
export const brandX = "#";
export const brandFB = "#";
export const brandYT = "#";
export const brandIG = "#";
// privacy policy
export const brandChildrenPrivacyAge = 18;

// default blurhash
export const defaultBlurhash =
  "WRDS%Y%NOaIVWBogt:o#bJRjaeog5XM{jExaocof-6RjM{t7t6j[";

// constants
// max file size allowed to be uploaded
export const MAX_FILE_SIZE = 5000000; // 5MB
export const USER_STORAGE_LIMIT = 100000000; // 100MB

// metadata
export const brandMetadataDescritpion =
  "Better health through hiropractic. Our mission is to treat musculoskeletal dysfunction by our proven manual methods.";
export const brandMetadataUrl = env.NEXT_PUBLIC_URI;
export const brandMetadataSiteName = "Chiropractor Template";
export const brandMetadataCanonical = env.NEXT_PUBLIC_URI;
export const brandMetadataImage = {
  url: `${env.NEXT_PUBLIC_R2_URI}/tmanbs9ofqhp14okq8xvx59f-logo_alpha_pink.png`,
  width: 874,
  height: 275,
  alt: "Chiropractor Template",
  type: "image/png",
};
export const brandMetadataTwitterAccount = "@RomanStepa49093";

// metadata services
export const brandMetadataServices =
  "We provide dietary management service, relax therapy, cold laser therapy, heat and cold therapy, massage therapy, pediatric services, fitness program, dietary management.";

// email constants
export const brandEmailBackgroundColor = "#fafafa";
export const brandEmailColor = "#fb6f84";
export const brandEmailTextColor = "#1c1917";
export const brandEmailMutedTextColor = "#535353";
export const brandEmailButtonTextColor = "#fafaf9";
export const brandEmailLogoUrl = `${env.NEXT_PUBLIC_URI}/logo.png`;
