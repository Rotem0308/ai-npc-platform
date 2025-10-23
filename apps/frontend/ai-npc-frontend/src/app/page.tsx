import Footer from "@/components/Footer";
import Header from "@/components/Header";
import wolfImg from "@/../../public/images/Wolf-NPC.png"; // your wolf image
import singImg from "@/../../public/images/Quest-Sign.png"; // your other image

export default function Home() {
  return (
    <div className="relative">
      <Header />

      {/* First half */}
      <section className="w-full h-screen relative bg-gray-900 overflow-hidden">
        <div className="flex w-full h-full">
          {/* Text side */}
          <div className="w-1/2 flex items-center justify-center text-white text-3xl z-10">
            Words
          </div>

          {/* Video side */}
          <div className="w-1/2 h-full relative z-10"></div>
        </div>

        {/* Bottom images */}
        <div className="absolute bottom-0 left-0 w-full flex justify-start items-end pointer-events-none">
          <img
            src={wolfImg.src}
            alt="Wolf"
            className="h-40 md:h-60 mr-4 animate-walk"
          />
          <img src={singImg.src} alt="Sing" className="h-40 md:h-60" />
        </div>
      </section>

      {/* Second half */}
      <section className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl">More text in second half</div>
      </section>

      <Footer />
    </div>
  );
}
