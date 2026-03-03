import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-zinc-950 text-white">
      <section className="min-h-screen flex items-center px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              COMMERCIAL GRADE{" "}
              <span className="text-[#d4af37]">GYM EQUIPMENT</span>
            </h1>

            <p className="mt-6 text-zinc-400 text-lg max-w-xl">
              Supplying premium-strength equipment to gyms, hotels, and
              corporate fitness facilities. Built for durability. Engineered for
              performance.
            </p>

            <div className="mt-8 flex gap-4">
              {/* <button className="bg-[#d4af37] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#c5a028] transition">
                REQUEST BULK QUOTE
              </button>  Add this later*/}

              <Link href="/products" className="border border-zinc-700 px-6 py-3 rounded-xl hover:border-[#d4af37] hover:text-[#d4af37] transition">
                VIEW CATALOG
              </Link>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl h-105 flex items-center justify-center border border-zinc-800">
            <Image
              src="https://imgs.search.brave.com/-wXdCMdLvr-nDIf6c_ln-ALeqp-plRiZnE9R7jAkxM8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzYwLzEy/L2RiLzYwMTJkYmE2/NDYyYjc3YzZhYzlm/ZDZlZmIzMmIzYTIz/LmpwZw"
              height={860}
              width={400}
              style={{ width: "auto", height: "100%" }}
              alt="Gym Equipment"
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
