// 관리자 업로드용 이미지 도구: 브라우저에서 줄이고(WebP), 긴 이미지는 조각으로 자른다

export function encode(c: HTMLCanvasElement, q: number, maxChars: number): string {
  let url = "";
  for (let quality = q; quality >= 0.4; quality -= 0.1) {
    url = c.toDataURL("image/webp", quality);
    if (!url.startsWith("data:image/webp")) url = c.toDataURL("image/jpeg", quality); // WebP 미지원 브라우저
    if (url.length <= maxChars) break;
  }
  return url;
}

// 가로/세로 중 긴 쪽을 max 이하로 줄여서 data URL 로 만든다
export async function shrink(src: Blob, max: number, q: number, maxChars: number): Promise<string> {
  const bmp = await createImageBitmap(src);
  const r = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(bmp.width * r));
  c.height = Math.max(1, Math.round(bmp.height * r));
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  bmp.close();
  return encode(c, q, maxChars);
}

// 세로로 긴 홍보 이미지를 가로 width 로 맞추고 sliceH 높이 조각으로 잘라 순서대로 돌려준다
export async function slicePromo(src: Blob, width = 1100, sliceH = 1400): Promise<string[]> {
  const bmp = await createImageBitmap(src);
  const scale = Math.min(1, width / bmp.width);
  const w = Math.round(bmp.width * scale);
  const h = Math.round(bmp.height * scale);
  const out: string[] = [];
  for (let y = 0; y < h; y += sliceH) {
    const hh = Math.min(sliceH, h - y);
    const c = document.createElement("canvas");
    c.width = w; c.height = hh;
    c.getContext("2d")!.drawImage(bmp, 0, y / scale, bmp.width, hh / scale, 0, 0, w, hh);
    out.push(encode(c, 0.8, 450_000));
  }
  bmp.close();
  return out;
}

export const dataUrlToBlob = async (u: string) => (await fetch(u)).blob();
