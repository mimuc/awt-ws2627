# Meme Generator – backend

```bash
npm install
npm start        # http://localhost:3001
```

- `GET /memes` – list of templates: `[{ "name": "doge", "link": "/memes/doge" }, …]`
- `GET /memes/:name?text=…&x=…&y=…&text2=…&x2=…&y2=…` – the template with an upper (`text`) and lower (`text2`) caption; `x`/`y` shift a caption in pixels.

Try it: http://localhost:3001/memes/doge?text=such%20react&text2=very%20hooks
