// A meme the user saved to the history
export interface SavedMeme {
  id: number;
  template: string;   // e.g. "doge"
  url: string;        // the rendered meme, e.g. /memes/doge?text=…
}
