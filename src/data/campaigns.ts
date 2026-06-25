export type MediaType = 'post' | 'video';

export interface CampaignMedia {
  id: string;
  type: MediaType;
  src: string;
  thumbnail?: string; // for videos
  title: string;      // "POST-01", "REEL-01", etc.
  alt?: string;       // for images
}

export interface Campaign {
  id: string;
  title: string;
  coverImage: string;
  media: CampaignMedia[];
}

export const campaigns: Campaign[] = [
  {
    id: "gopal-snacks",
    title: "Gopal Snacks",
    coverImage: "/campaigns/gopal-snacks/cover.png",
    media: [
      { id: "post-1", type: "post", src: "/campaigns/gopal-snacks/post-01.png", title: "POST-01", alt: "Gopal Snacks Post 1" },
      { id: "post-2", type: "post", src: "/campaigns/gopal-snacks/post-02.png", title: "POST-02", alt: "Gopal Snacks Post 2" },
      { id: "post-3", type: "post", src: "/campaigns/gopal-snacks/post-03.png", title: "POST-03", alt: "Gopal Snacks Post 3" },
      { id: "post-4", type: "post", src: "/campaigns/gopal-snacks/post-04.png", title: "POST-04", alt: "Gopal Snacks Post 4" },
      { id: "post-5", type: "post", src: "/campaigns/gopal-snacks/post-05.png", title: "POST-05", alt: "Gopal Snacks Post 5" },
      { id: "post-6", type: "post", src: "/campaigns/gopal-snacks/post-06.png", title: "POST-06", alt: "Gopal Snacks Post 6" },
      { id: "reel-1", type: "video", src: "/campaigns/gopal-snacks/reel-01.mp4", title: "REEL-01" },
      { id: "reel-2", type: "video", src: "/campaigns/gopal-snacks/reel-02.mp4", title: "REEL-02" },
    ]
  },
  {
    id: "air-cooler",
    title: "Air Cooler",
    coverImage: "/campaigns/air-cooler/cover.png",
    media: [
      { id: "post-1", type: "post", src: "/campaigns/air-cooler/post-01.png", title: "POST-01", alt: "Air Cooler Post 1" },
      { id: "post-2", type: "post", src: "/campaigns/air-cooler/post-02.png", title: "POST-02", alt: "Air Cooler Post 2" },
      { id: "post-3", type: "post", src: "/campaigns/air-cooler/post-03.png", title: "POST-03", alt: "Air Cooler Post 3" },
      { id: "post-4", type: "post", src: "/campaigns/air-cooler/post-04.png", title: "POST-04", alt: "Air Cooler Post 4" },
      { id: "post-5", type: "post", src: "/campaigns/air-cooler/post-05.png", title: "POST-05", alt: "Air Cooler Post 5" },
      { id: "post-6", type: "post", src: "/campaigns/air-cooler/post-06.png", title: "POST-06", alt: "Air Cooler Post 6" },
      { id: "reel-1", type: "video", src: "/campaigns/air-cooler/reel-01.mp4", title: "REEL-01" },
      { id: "reel-2", type: "video", src: "/campaigns/air-cooler/reel-02.mp4", title: "REEL-02" },
    ]
  },
  {
    id: "mahalaxmi-masala",
    title: "Mahalaxmi Masala",
    coverImage: "/campaigns/mahalaxmi-masala/post-01.png",
    media: [
      { id: "post-1", type: "post", src: "/campaigns/mahalaxmi-masala/post-01.png", title: "POST-01", alt: "Mahalaxmi Masala Post 1" },
      { id: "post-2", type: "post", src: "/campaigns/mahalaxmi-masala/post-02.png", title: "POST-02", alt: "Mahalaxmi Masala Post 2" },
      { id: "post-3", type: "post", src: "/campaigns/mahalaxmi-masala/post-03.png", title: "POST-03", alt: "Mahalaxmi Masala Post 3" },
      { id: "post-4", type: "post", src: "/campaigns/mahalaxmi-masala/post-04.png", title: "POST-04", alt: "Mahalaxmi Masala Post 4" },
      { id: "post-5", type: "post", src: "/campaigns/mahalaxmi-masala/post-05.png", title: "POST-05", alt: "Mahalaxmi Masala Post 5" },
      { id: "post-6", type: "post", src: "/campaigns/mahalaxmi-masala/post-06.png", title: "POST-06", alt: "Mahalaxmi Masala Post 6" },
      { id: "post-7", type: "post", src: "/campaigns/mahalaxmi-masala/post-07.png", title: "POST-07", alt: "Mahalaxmi Masala Post 7" },
      { id: "post-8", type: "post", src: "/campaigns/mahalaxmi-masala/post-08.png", title: "POST-08", alt: "Mahalaxmi Masala Post 8" },
      { id: "reel-1", type: "video", src: "/campaigns/mahalaxmi-masala/reel-01.mp4", title: "REEL-01" },
    ]
  }
];

export function getCampaignById(id: string): Campaign | undefined {
  return campaigns.find((c) => c.id === id);
}
