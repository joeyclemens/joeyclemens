export interface Photo {
  src: string;
  alt: string;
  caption: string;
  location: string;
  locationSlug: string;
  date: string; // ISO date
}

export const photos: Photo[] = [
  {
    src: "/photos/full/boscawen-park/20260716_062853.jpg",
    alt: "Truro Cathedral seen across the river from Boscawen Park, framed by riverside buildings and trees",
    caption: "Truro Cathedral, seen across the river from Boscawen Park this morning. Still figuring out what I'm doing, but I liked how the riverside buildings and trees framed it.",
    location: "Boscawen Park, Truro",
    locationSlug: "boscawen-park",
    date: "2026-07-16T06:28:53",
  },
  {
    src: "/photos/full/sunny-corner/20260716_065128.jpg",
    alt: "Three small boats moored on still water at Sunny Corner, reflections visible",
    caption: "A couple of boats moored at Sunny Corner. Tried to line things up symmetrically — probably put the horizon a bit too dead centre, but I'm happy with how it came out.",
    location: "Sunny Corner, Truro",
    locationSlug: "sunny-corner",
    date: "2026-07-16T06:51:28",
  },
  {
    src: "/photos/full/malpas/20260721_065042.jpg",
    alt: "A small hand-painted wooden toy boat sitting among weeds at Malpas, with the river and hills blurred in the background",
    caption: "A little painted wooden boat I found propped in the weeds at Malpas. Focused in close and let the river and hills blur out behind it — happy with how much depth that gave it.",
    location: "Malpas, Truro",
    locationSlug: "malpas",
    date: "2026-07-21T06:50:43",
  },
  {
    src: "/photos/full/sunny-corner/20260717_063751.jpg",
    alt: "Flowers along a moor point for boats in Sunny Corner, Truro",
    caption: "Leading lines along the flower beds guide the eye towards moored boats, balancing natural texture against marine geometry in soft morning light",
    location: "sunny-corner, Truro",
    locationSlug: "sunny-corner",
    date: "2026-07-21T06:37:43",
  },
];

// Newest first, by default
export const sortedPhotos = [...photos].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export interface LocationFolder {
  slug: string;
  name: string;
  count: number;
  latestDate: string;
}

export function getLocations(): LocationFolder[] {
  const map = new Map<string, LocationFolder>();
  for (const photo of photos) {
    const existing = map.get(photo.locationSlug);
    if (existing) {
      existing.count += 1;
      if (new Date(photo.date).getTime() > new Date(existing.latestDate).getTime()) {
        existing.latestDate = photo.date;
      }
    } else {
      map.set(photo.locationSlug, {
        slug: photo.locationSlug,
        name: photo.location,
        count: 1,
        latestDate: photo.date,
      });
    }
  }
  return [...map.values()].sort(
    (a, b) => new Date(b.latestDate).getTime() - new Date(a.latestDate).getTime()
  );
}

export function getPhotosByLocation(slug: string): Photo[] {
  return sortedPhotos.filter((p) => p.locationSlug === slug);
}
