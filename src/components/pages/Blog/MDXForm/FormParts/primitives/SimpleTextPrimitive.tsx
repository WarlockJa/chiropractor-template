import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  convertCodesToSpecialCharacters,
  convertSpecialCharactersToCodes,
} from "@/lib/convertStringSpecialCharacters";

interface ISimpleTextPrimitiveProps {
  labelText: string;
  placeholderText: string;
  text: string;
  setText: (text: string) => void;
  required?: boolean;
}

export default function SimpleTextPrimitive({
  text,
  setText,
  labelText,
  placeholderText,
  required,
}: ISimpleTextPrimitiveProps) {
  return (
    <div className="p-4">
      <Label htmlFor="simpleTextPrimitive">{labelText}</Label>
      <Input
        id="simpleTextPrimitive"
        placeholder={placeholderText}
        value={convertCodesToSpecialCharacters(text)}
        onChange={(e) =>
          setText(convertSpecialCharactersToCodes(e.target.value))
        }
        maxLength={100}
        required={required}
      />
    </div>
  );
}
