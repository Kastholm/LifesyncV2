import MyClock from "@/components/dashboard/Clock";
import Dates from "@/components/dashboard/Dates";
import Week from "@/components/dashboard/Week";
import YouTube from "@/components/dashboard/Media";
import Link from "next/link";

export default async function Home() {
  return (
    <section className="w-full h-full grid grid-cols-2 gap-2">
      <div>
        <div className="grid grid-cols-2 gap-2">
          <MyClock />
          <Week />
        </div>
        <YouTube />
      </div>
      <Dates />
    </section>
  );
}
