
import Books from "@/components/dashboard/Books";
import MyClock from "@/components/dashboard/Clock";
import Dates from "@/components/dashboard/Dates";
import Week from "@/components/dashboard/Week";
import YouTube from "@/components/dashboard/Youtube";

export default function Home() {
  return (
   

    <section className="w-full grid grid-cols-2">
      <div>
     <div className="grid grid-cols-2">
       <MyClock /> 
       <Week />
     </div>
     <YouTube />
     <Books />
      </div>
     <Dates />
    </section>

    
  );
}
