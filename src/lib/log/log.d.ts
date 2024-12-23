type TLogEntry = "warning" | "error" | "information" | "security";

interface ILogCodes {
  [key: TLogEntry]: Record<string, number>;
}
