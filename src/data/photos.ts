export interface Photo {
  src: string;
  alt: string;
  caption: string;
  date: string; // ISO date
}

export const photos: Photo[] = [
  {
    src: "/photos/full/20260716_062853.jpg",
    alt: "Truro Cathedral seen across the river from Boscawen Park, framed by riverside buildings and trees",
    caption: "Truro Cathedral, seen across the river from Boscawen Park this morning. Still figuring out what I'm doing, but I liked how the riverside buildings and trees framed it.",
    date: "2026-07-16T06:28:53",
  },
  {
    src: "/photos/full/20260716_065128.jpg",
    alt: "Three small boats moored on still water at Boscawen Park, reflections visible",
    caption: "A couple of boats moored at Sunny Corner. Tried to line things up symmetrically — probably put the horizon a bit too dead centre, but I'm happy with how it came out.",
    date: "2026-07-16T06:51:28",
  },
];

// Newest first
export const sortedPhotos = [...photos].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
