"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toast } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function CalendarForm({ onSubmit }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [eventType, setEventType] = useState("aftale");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(null);

  const handleSubmit = () => {
    const data = {
      name: eventName,
      date: eventDate,
      type: eventType,
    };

    onSubmit(data);
  };

  return (
    <Form {...form}>
      <div className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Begivenhed</FormLabel>
              <Input
                onChange={(e) => setEventName(e.target.value)}
                className="w-60"
                type="text"
                placeholder="Navn"
              />
              <FormLabel>Dato</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Vælg dato</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date); // Update form field
                      setEventDate(date); // Set the event date in state
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormLabel>Type Begivenhed</FormLabel>
              <Select onValueChange={(value) => setEventType(value)}>
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Vælg begivenhed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type Begivenhed</SelectLabel>
                    <SelectItem value="aftale">Aftale</SelectItem>
                    <SelectItem value="fødselsdag">Fødselsdag</SelectItem>
                    <SelectItem value="ferie">Ferie</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
              <Button type="submit">Submit</Button>
            </FormItem>
          )}
        />
        <div onClick={() => handleSubmit()}>Submittt</div>
      </div>
    </Form>
  );
}

{
  /* <form
          action={async () => {
            "use server";
            await sendDate();
          }}
        >
          <Button>Submit</Button>
        </form> */
}

{
  /* <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FCopenhagen&bgcolor=%23ffffff&hl=da&title=Min%20Kalendar&src=a2FzdGhvbG0xOTk1QGdtYWlsLmNvbQ&src=ZGEuZGFuaXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uZGFuaXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%237986CB&color=%230B8043"
        width="800"
        height="600"
        scrolling="no"
      ></iframe> */
}

/* function onSubmit(data: z.infer<typeof FormSchema>) {
    

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(data, null, 2)}waaaas
          </code>
        </pre>
      ),
    });
  } */