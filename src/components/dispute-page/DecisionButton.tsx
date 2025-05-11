"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

export default function DecisionButton() {
  const [open, setOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <>
      <Button className="w-full" onClick={() => setOpen(true)}>
        Decision
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Make a Decision</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium mb-3">Adjust your decision:</p>
                <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} className="w-full" />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">PartyA :{sliderValue}%</span>
                  {/* <span className="text-sm font-medium">{sliderValue}%</span> */}
                  <span className="text-sm text-muted-foreground">PartyB :{100 - sliderValue[0]}%</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
