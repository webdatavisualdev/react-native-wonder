/**
 * An interest for a user, example would be "Hiking" or "Baseball"
 */
export default interface Topic {
  id: number;
  name: string;
  keywords: string[];
  icon: string;
}
