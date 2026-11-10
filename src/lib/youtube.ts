// 유튜브 링크(watch / youtu.be / shorts / embed)에서 영상 ID(11자)를 뽑는다. 유튜브 링크가 아니면 null
export function youtubeId(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\.|^m\./, "");
    let id: string | null = null;
    if (host === "youtu.be") id = u.pathname.split("/")[1] ?? null;
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else {
        const [, kind, vid] = u.pathname.split("/");
        if (kind === "shorts" || kind === "embed" || kind === "live") id = vid ?? null;
      }
    }
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}
