import Image from "next/image";

export default function SadFacePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <Image src="/sadface.png" alt="" width={1600} height={1600} className="h-auto w-full max-w-lg" priority />
    </div>
  );
}
