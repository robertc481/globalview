import type { CloudinaryImage, CloudinarySearchResponse } from "@/types";

interface ImageTransform {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale" | "thumb" | "limit";
  quality?: "auto" | number;
  aspectRatio?: string;
}

export function getCloudinaryUrl(
  publicId: string,
  transforms: ImageTransform = {}
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    return "/placeholder.svg";
  }

  const parts: string[] = ["f_auto", "q_auto"];
  if (transforms.width) parts.push(`w_${transforms.width}`);
  if (transforms.height) parts.push(`h_${transforms.height}`);
  if (transforms.crop) parts.push(`c_${transforms.crop}`);
  if (transforms.aspectRatio) parts.push(`ar_${transforms.aspectRatio}`);

  return `https://res.cloudinary.com/${cloudName}/image/upload/${parts.join(",")}/${publicId}`;
}

async function searchCloudinary(
  expression: string,
  maxResults = 30
): Promise<CloudinaryImage[]> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) return [];

  try {
    const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString(
      "base64"
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({
          expression,
          max_results: maxResults,
          sort_by: [{ public_id: "asc" }],
        }),
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) return [];

    const data = (await response.json()) as CloudinarySearchResponse;

    return data.resources.map((r) => ({
      public_id: r.public_id,
      secure_url: r.secure_url,
      width: r.width,
      height: r.height,
      format: r.format,
    }));
  } catch {
    return [];
  }
}

export async function getFolderImages(
  folder: string
): Promise<CloudinaryImage[]> {
  return searchCloudinary(`folder:${folder}`);
}

export async function getProjectCovers(
  folders: string[]
): Promise<Record<string, CloudinaryImage | undefined>> {
  if (folders.length === 0) return {};

  const expression = folders.map((f) => `folder:${f}`).join(" OR ");
  const images = await searchCloudinary(expression, 100);

  const allByFolder: Record<string, CloudinaryImage[]> = {};
  for (const img of images) {
    const folder = img.public_id.substring(0, img.public_id.lastIndexOf("/"));
    if (!allByFolder[folder]) allByFolder[folder] = [];
    allByFolder[folder].push(img);
  }

  const grouped: Record<string, CloudinaryImage | undefined> = {};
  for (const [folder, imgs] of Object.entries(allByFolder)) {
    grouped[folder] = imgs.length > 1 ? imgs[1] : imgs[0];
  }

  return grouped;
}
