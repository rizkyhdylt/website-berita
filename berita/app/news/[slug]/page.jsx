// app/news/[slug]/page.jsx
import Details from "./Details";

export async function generateMetadata({ params }) {
  const { slug } = await params; // HARUS pakai await di versi baru

  try {
    const res = await fetch(`https://jatengupdates.site/api/news/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        title: "Berita tidak ditemukan",
        description: "Halaman berita tidak tersedia",
      };
    }

    const news = await res.json();

    return {
      title: news.title,
      description: news.description?.slice(0, 150) || "Baca berita terbaru di Jatengupdates",
      openGraph: {
        type: "article",
        url: `https://jatengupdates.site/news/${news.slug}`,
        title: news.title,
        description: news.description?.slice(0, 150),
        images: [
          news.image?.startsWith("http")
            ? news.image
            : `https://jatengupdates.site${news.image || "/default-thumbnail.jpg"}`,
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: news.title,
        description: news.description?.slice(0, 150),
        images: [
          news.image?.startsWith("http")
            ? news.image
            : `https://jatengupdates.site${news.image || "/default-thumbnail.jpg"}`,
        ],
      },
    };
  } catch (err) {
    console.error("generateMetadata error:", err);
    return {
      title: "Error memuat berita",
      description: "Terjadi kesalahan saat memuat metadata berita",
    };
  }
}

// ⬅️ jangan lupa async
export default async function Page({ params }) {
  const { slug } = await params;
  return <Details slug={slug} />;
}
