import { SHIV_CHALISA } from "@/lib/paath/shiv";
import PaathPage, { paathMetadata } from "@/components/paath/PaathPage";

export const metadata = paathMetadata(SHIV_CHALISA);

export default function Page() {
  return <PaathPage paath={SHIV_CHALISA} />;
}
