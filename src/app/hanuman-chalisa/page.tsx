import { HANUMAN_CHALISA } from "@/lib/paath/registry";
import PaathPage, { paathMetadata } from "@/components/paath/PaathPage";

export const metadata = paathMetadata(HANUMAN_CHALISA);

export default function Page() {
  return <PaathPage paath={HANUMAN_CHALISA} />;
}
