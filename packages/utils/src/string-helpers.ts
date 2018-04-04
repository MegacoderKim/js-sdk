/**
 * current_time => Current time
 * @param prop : string which is humanized
 * @param separator : to split the prop string
 */
export const propToString = (prop: string, separator: string = '_'): string => {
  if (!prop) return prop;
    const words = prop.split(separator);
    if (!words.length) return prop;
    return words.reduce((string: string, word: string) => {
        return !!string ? `${string} ${word}` : word[0].toUpperCase() + word.slice(1);
    }, "")
}