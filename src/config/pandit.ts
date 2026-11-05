// The only place with Pandit Ji's real details. Empty until the Owner fills it in.
// Nothing here is invented: every field stays undefined until the Owner supplies a
// real value. The helpers in src/lib/pandit.ts gate on these values so an empty
// profile shows no claims at all.

export interface PanditProfile {
  name?: string;
  photoSrc?: string; // path under /public
  city?: string;
  yearsOfPractice?: number;
  languages?: string[];
}

// Empty until the Owner answers. Do NOT add placeholder/sample values here.
export const PANDIT: PanditProfile = {};
