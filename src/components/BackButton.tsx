import { LucideMoveLeft } from "lucide-react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";

export default function BackButton({ text }: { text?: string }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <Button
      onClick={handleBack}
      variant="ghost"
      className="flex cursor-pointer items-center text-gray-500 hover:text-gray-600"
    >
      <LucideMoveLeft />
      <p className="pl-2 text-sm leading-none">{text ?? "Back"}</p>
    </Button>
  );
}
