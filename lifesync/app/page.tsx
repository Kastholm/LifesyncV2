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
      {/* <div className="rounded-xl ">
        <iframe className="w-full h-[40em] rounded-xl" src="http://homeassistant.local:8123/lovelace-shroom/app" />
      </div> */}
    </section>
  );
}
