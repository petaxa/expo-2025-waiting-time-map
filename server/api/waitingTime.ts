export default defineEventHandler(
  async (): Promise<
    {
      osmId: string;
      waitTime: string;
      elapsedTime: string;
      postedAt: string;
    }[]
  > => {
    const url =
      "https://petaxa.github.io/expo-2025-waiting-time-json/waiting-time.json";
    const res = await fetch(url);
    const json = await res.json();
    return json.data;
  }
);
