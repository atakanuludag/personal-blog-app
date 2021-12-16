export default function useText() {

  const textLimit = (text: string, length: number, three: boolean = true) => text.length > length ? `${text.substring(0, length)}${three && '...'}` : text;

  return { textLimit };
}