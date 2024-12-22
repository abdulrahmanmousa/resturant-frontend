import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";

export default function DateTimePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("05:00");
  const [date, setDate] = useState(null);
  return (
    <div className="space-y-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full font-normal",
              !date && "text-muted-foreground",
            )}
          >
            {date ? (
              `${format(date, "PPP")}, ${time}`
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 rounded-xl" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date || date}
            onSelect={(selectedDate) => {
              const [hours, minutes] = time?.split(":");
              selectedDate?.setHours(parseInt(hours), parseInt(minutes));
              setDate(selectedDate);
            }}
            onDayClick={() => setIsOpen(false)}
            fromYear={2000}
            toYear={new Date().getFullYear()}
            defaultMonth={new Date()}
          />
        </PopoverContent>
      </Popover>
      <Select
        defaultValue={time}
        onValueChange={(e) => {
          setTime(e);
          if (date) {
            const [hours, minutes] = e.split(":");
            const newDate = new Date(date.getTime());
            newDate.setHours(parseInt(hours), parseInt(minutes));
            setDate(newDate);
          }
        }}
      >
        <SelectTrigger className="font-normal focus:ring-0 w-full rounded-xl">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-[15rem]">
            {Array.from({ length: 96 }).map((_, i) => {
              const hour = Math.floor(i / 4)
                .toString()
                .padStart(2, "0");
              const minute = ((i % 4) * 15).toString().padStart(2, "0");
              return (
                <SelectItem key={i} value={`${hour}:${minute}`}>
                  {hour}:{minute}
                </SelectItem>
              );
            })}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
}
