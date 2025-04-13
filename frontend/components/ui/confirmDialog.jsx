"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmationDialog({
  isOpen,
  onConfirm,
  onCancel,
  machineName,
  time,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md animate-slideUp">
        <DialogHeader>
          <DialogTitle className="text-lg text-center">
            Czy potwierdzasz rezerwację <br />
            <span className="font-bold">{machineName}</span> o <b>{time}</b>?
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex justify-between pt-4">
          <Button variant="outline" onClick={onCancel}>
            Nie
          </Button>
          <Button onClick={onConfirm} className="bg-green-600 text-white">
            Tak
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
