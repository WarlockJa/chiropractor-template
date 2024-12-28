// interface IBlogPost {
//   id: string;
//   title: string;
//   description: string | null;
//   previewImage: string | null;
//   updatedAt: Date;
// }

// TODO change when done
// interface QueueMessageBody {
//   id:
//     | "log"
//     | "R2 Delete"
//     | "Blurhash"
//     | "AI Image Caption"
//     | "Vectorize Upsert"
//     | "Vectorize Delete";
//   body: string;
// }

// upsert to Vectorize data
interface VectorizeUpsertQueueItem {
  id: string;
  value: string;
}

// PartWrapper type for formValues
interface IFormValues {
  originalState: TAllBlogParts;
  isOkToSave: boolean;
  currentValues: TAllBlogParts;
  noErrors: boolean;
}

// interfaces from ImagePrimitive for File and URI
interface IFilesArrayItem {
  aria: string | undefined;
  instagram: string | undefined;
  imageFile: File;
  errorText: string | undefined;
}
interface IImageURIsArrayItem {
  aria: string | undefined;
  instagram: string | undefined;
  imageURI: string;
  errorText: string | undefined;
}

// Either type maybe will use?
type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

// does not work. base values are never TODO fix?
type Either<T, U> = Only<T, U> | Only<U, T>;
// example
// interface MessageBasics {
//   timestamp?: number;
//   /* more general properties here */
// }
// interface MessageWithText extends MessageBasics {
//   text: string;
// }
// interface MessageWithAttachment extends MessageBasics {
//   attachment: string;
// }
// type Message = Either<MessageWithText, MessageWithAttachment>;

// working alternative
// interface IBase {
//   id: string;
// }
// interface IName extends IBase {
//   name: string;
//   parent?: never;
// }
// interface IParent extends IBase {
//   parent: string;
//   name?: never;
// }
// type TEither = IName | IParent
