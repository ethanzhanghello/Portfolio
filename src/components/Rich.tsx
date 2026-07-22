/**
 * Renders content strings with **highlight** syntax: anything wrapped in
 * double asterisks becomes a semibold accent span. Keeps metric emphasis
 * editable from data/content.ts without touching any component.
 */
export default function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-accent">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
