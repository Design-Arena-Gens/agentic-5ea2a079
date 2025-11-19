import Image from "next/image";
import { Suspense } from "react";
import { fetchTrendingShorts, type TrendingVideo } from "../lib/trending";

export const revalidate = 300; // cache for 5 minutes
export const dynamic = "force-dynamic";

export default async function Page() {
  const region = "ID";
  let data: TrendingVideo[] = [];
  try {
    data = await fetchTrendingShorts(region);
  } catch {
    data = [];
  }

  return (
    <>
      <Toolbar region={region} count={data.length} />
      <div className="grid">
        {data.map((v) => (
          <VideoCard key={v.url} video={v} />
        ))}
      </div>
    </>
  );
}

function Toolbar({ region, count }: { region: string; count: number }) {
  return (
    <div className="toolbar">
      <span className="chip">Region: {region}</span>
      <span className="chip">Shorts: {count}</span>
      <span className="spacer" />
      <a
        className="button"
        href="https://piped.video/api/trending?region=ID"
        target="_blank"
        rel="noreferrer"
      >
        Lihat sumber API
      </a>
    </div>
  );
}

function VideoCard({ video }: { video: TrendingVideo }) {
  const thumbnail =
    video.thumbnail ||
    `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <article className="card">
      <div className="thumb">
        <a
          href={video.watchUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Tonton ${video.title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumbnail} alt={video.title} loading="lazy" />
        </a>
      </div>
      <div className="card-body">
        <h3 className="title">{video.title}</h3>
        <div className="meta">
          <span>{video.uploader}</span>
          <span>?</span>
          <span>{formatDuration(video.duration)}</span>
        </div>
        <div className="chips" style={{ marginTop: 8 }}>
          <span className="chip">Views: {formatNumber(video.views)}</span>
          <span className="chip">?? {formatNumber(video.likes ?? 0)}</span>
          <span className="chip">Short</span>
        </div>
        <div className="actions">
          <a
            className="button emphasis"
            href={video.embedUrl}
            target="_blank"
            rel="noreferrer"
          >
            Putar (Embed)
          </a>
          <a className="button" href={video.watchUrl} target="_blank" rel="noreferrer">
            Tonton di YouTube
          </a>
        </div>
        <div style={{ marginTop: 10 }}>
          <Suspense>
            <iframe
              className="embed"
              src={video.embedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer"
              title={video.title}
            />
          </Suspense>
        </div>
      </div>
    </article>
  );
}

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

