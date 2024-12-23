import { env } from "./lib/env.mjs";

// namings
export const brandName = "CHIROPRACTOR";
// export const brandName = "Tx Computers";
export const brandAddress = [
  "77 Massachusetts Ave ",
  "Cambridge, MA 02139 ",
  "United States",
];
export const brandEmail = "roman.s@warlockja.com";
export const brandPhone = { number: "5555555555", string: "555 555-55-55" };
// export const brandPhone = { number: "12819191327", string: "+1 281-919-1327" };
export const brandWhatsApp = "905310884191";
// TODO translate
export const brandWorkHours = "9:00 - 18:00 / ";

export const brandNoReplyEmail = "no-reply@warlockja.com";
export const brandCoordinates = {
  lat: 42.36096175381038,
  lng: -71.0941526493546,
};
export const brandMapDirectionsLink =
  "https://www.google.com/maps/dir//Massachusetts+Institute+of+Technology,+77+Massachusetts+Ave,+Cambridge,+MA+02139,+United+States/@42.360091,-71.2465953,12z/data=!3m1!5s0x89e370aa6bd83625:0x217abf15aa96779e!4m18!1m8!3m7!1s0x89e370aaf51a6a87:0xd0e08ea5b308203c!2sMassachusetts+Institute+of+Technology!8m2!3d42.360091!4d-71.09416!15sCgNNSVRaBSIDbWl0kgEKdW5pdmVyc2l0eeABAA!16zL20vMDRyd3g!4m8!1m0!1m5!1m1!1s0x89e370aaf51a6a87:0xd0e08ea5b308203c!2m2!1d-71.09416!2d42.360091!3e2?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D";
export const brandPlaceId = "ChIJh2oa9apw44kRPCAIs6WO4NA";
// export const brandMapDirectionsLink =
//   "https://www.google.com/maps/dir//TX+Computers,+6271+Farm+to+Market+1960+Rd+W+STE+B,+Houston,+TX+77069,+United+States/@29.8437557,-95.6562488,11.21z/data=!4m18!1m8!3m7!1s0x8640cdca0d132c75:0x129bd13de7867098!2sTX+Computers!8m2!3d29.973451!4d-95.523786!15sCh9jb21wdXRlciByZXBhaXIgbmVhciBUZXhhcywgVVNBWiAiHmNvbXB1dGVyIHJlcGFpciBuZWFyIHRleGFzIHVzYZIBF2NvbXB1dGVyX3JlcGFpcl9zZXJ2aWNlmgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU41YzI5cGVXUm5FQUXgAQD6AQQIEBA5!16s%2Fg%2F11g6r3gn31!4m8!1m0!1m5!1m1!1s0x8640cdca0d132c75:0x129bd13de7867098!2m2!1d-95.5237942!2d29.9734586!3e2?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D";
// export const brandPlaceId =
//   "Ejs2MjcxIEZhcm0gdG8gTWFya2V0IDE5NjAgUmQgVyBzdGUgYiwgSG91c3RvbiwgVFggNzcwNjYsIFVTQSI8GjoKMRIvChQKEgmBrcEOys1AhhEUWXIuuoTflBD_MCoUChIJiwS00nPLQIYR61qC8W6NN9oSBXN0ZSBi";
// socials
export const brandX = "https://x.com/lawandordertv";
// export const brandFB = "https://www.facebook.com/TXComputers01/";
export const brandFB = "https://www.facebook.com/nbclawandorder";
export const brandYT = "https://www.youtube.com/@lawandorder";
export const brandIG = "https://www.instagram.com/NBCLawandOrder";
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
  "Compurery is an end stop for all of you computer repair needs. We work with any brand, any OS, any issue.";
export const brandMetadataUrl = env.NEXT_PUBLIC_URI;
export const brandMetadataSiteName = "Compurery Technology Solutions";
export const brandMetadataCanonical = env.NEXT_PUBLIC_URI;
export const brandMetadataImage = {
  url: `${env.NEXT_PUBLIC_R2_URI}/nbvfa3n7ybokrr7lysl2e003-logo.webp`,
  width: 874,
  height: 275,
  alt: "Compurery Technology Solutions",
  type: "image/webp",
};
export const brandMetadataTwitterAccount = "@RomanStepa49093";

// metadata services
export const brandMetadataServices =
  "We provide repair services with your MacBook, windows laptop or pc, remote tech support, on site support, custom pc build and repair, data recovery, computer os restoration and maintenance";
