import type { DeityKey } from "@/lib/darshan";

/**
 * Deities whose backdrop image is available on disk.
 * Add a key here ONLY after adding public/images/darshan/<key>.jpg,
 * otherwise the page would try to serve a broken image.
 */
export const AVAILABLE_DARSHAN: DeityKey[] = ["shiv", "hanuman", "durga", "vishnu"];
