export interface Photo {
  src: string;
  alt: string;
  caption: string;
  location: string;
  date: string; // ISO date
}

export const photos: Photo[] = [
  {
    src: "/photos/full/boscawen-park/20260716_062853.jpg",
    alt: "Truro Cathedral seen across the river from Boscawen Park, framed by riverside buildings and trees",
    caption: "Truro Cathedral, seen across the river from Boscawen Park this morning. Still figuring out what I'm doing, but I liked how the riverside buildings and trees framed it.",
    location: "Boscawen Park, Truro",
    date: "2026-07-16T06:28:53",
  },
  {
    src: "/photos/full/sunny-corner/20260716_065128.jpg",
    alt: "Three small boats moored on still water at Sunny Corner, reflections visible",
    caption: "A couple of boats moored at Sunny Corner. Tried to line things up symmetrically — probably put the horizon a bit too dead centre, but I'm happy with how it came out.",
    location: "Sunny Corner, Truro",
    date: "2026-07-16T06:51:28",
  },
  {
    src: "/photos/full/malpas/20260721_065042.jpg",
    alt: "A small hand-painted wooden toy boat sitting among weeds at Malpas, with the river and hills blurred in the background",
    caption: "A little painted wooden boat I found propped in the weeds at Malpas. Focused in close and let the river and hills blur out behind it — happy with how much depth that gave it.",
    location: "Malpas, Truro",
    date: "2026-07-21T06:50:43",
  },
];

// Newest first, by default
export const sortedPhotos = [...photos].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
