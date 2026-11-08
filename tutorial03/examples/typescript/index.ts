// TypeScript – Examples (slide "TypeScript – Examples")
// Compile with:  tsc index.ts   →   produces index.js

const count: number = 0;

function shout (lines: string[]): string {
  return lines.join(' ').toUpperCase();
}

// There are    interfaces in TS
interface Caption {
  text: string;
  position: 'top' | 'bottom';
}

// Classes can   have member-visibility
class Meme {
  private captions: Caption[] = [];
  public addCaption (c: Caption): void {
    this.captions.push(c);
  }
  public toString (): string {
    return shout(this.captions.map((c) => c.text));
  }
}

const meme = new Meme();
meme.addCaption({ text: 'One does not simply', position: 'top' });
meme.addCaption({ text: 'write beautiful JavaScript', position: 'bottom' });
console.log(count, meme.toString());

// Try it: these lines would not compile – uncomment them and run tsc again.
// meme.captions = [];                                  // private!
// meme.addCaption({ text: 'Hi', position: 'middle' }); // not 'top' | 'bottom'
