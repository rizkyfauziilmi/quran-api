/**
 * Joins an array of strings into a human-readable list separated by commas and "or".
 *
 * Examples:
 *   joinWithOr([]) => ''
 *   joinWithOr(['apple']) => 'apple'
 *   joinWithOr(['apple', 'banana']) => 'apple or banana'
 *   joinWithOr(['apple', 'banana', 'cherry']) => 'apple, banana, or cherry'
 *
 * @param arr - The array of strings to join.
 * @returns The joined string.
 */
export function joinWithOr(arr: string[]): string {
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} or ${arr[1]}`;
  return `${arr.slice(0, -1).join(', ')}, or ${arr[arr.length - 1]}`;
}
