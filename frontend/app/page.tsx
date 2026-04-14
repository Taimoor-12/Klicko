import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <Image
        src="./logo-white.svg" 
        width={500} 
        height={500} 
        alt="logo" />
    </main>
  );
}
