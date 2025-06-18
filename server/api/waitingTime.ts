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
      "https://script.google.com/macros/s/AKfycbwhVUC7H64Eu2l6Lbw2Z2NUL_SeKg3UuTNA77oIPTae3wNRvtCdxo-zuejLOlUXXU_d/exec?route=all";
    const res = await fetch(url);
    const json = await res.json();
    return json.data;
  }
);
