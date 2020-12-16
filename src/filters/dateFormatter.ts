export default function dateFormatter(value: string) {
  return new Date(value).toUTCString();
}