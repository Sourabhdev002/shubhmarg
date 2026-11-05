import { DURGA_CHALISA } from "@/lib/paath/durga";
import PaathPage, { paathMetadata } from "@/components/paath/PaathPage";

export const metadata = paathMetadata(DURGA_CHALISA);

export default function Page() {
  return <PaathPage paath={DURGA_CHALISA} />;
}
