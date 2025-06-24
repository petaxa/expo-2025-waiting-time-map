export default defineEventHandler(
  async (): Promise<
    {
      osmId: string;
      waitTime: string;
      elapsedTime: string;
      postedAt: string;
    }[]
  > => {
    const url = "https://content.expo-waiting-map.petaxa.com/waiting-time.json";
    const res = await fetch(url);
    const json = await res.json();
    return json.data;
  }
);
