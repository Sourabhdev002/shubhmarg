import { SHANI_CHALISA } from "@/lib/paath/shani";
import PaathPage, { paathMetadata } from "@/components/paath/PaathPage";

export const metadata = paathMetadata(SHANI_CHALISA);

export default function Page() {
  return <PaathPage paath={SHANI_CHALISA} />;
}
