/** Renders the tiny markup used in data/blogs.js (## h2, ### h3, - list, blank-line paragraphs). */
export default function BlogBody({ text }) {
  const out = [];
  let list = null;
  const flush = (k) => { if (list) { out.push(<ul key={`u${k}`}>{list.map((x, j) => <li key={j}>{x}</li>)}</ul>); list = null; } };
  text.trim().split('\n').forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith('- ')) { (list ||= []).push(t.slice(2)); return; }
    flush(i);
    if (!t) return;
    if (t.startsWith('### ')) out.push(<h3 key={i}>{t.slice(4)}</h3>);
    else if (t.startsWith('## ')) out.push(<h2 key={i}>{t.slice(3)}</h2>);
    else out.push(<p key={i}>{t}</p>);
  });
  flush('end');
  return <>{out}</>;
}
