'use client';

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function JoinEventModal({ onClose, onConfirm }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Czy na pewno chcesz zapisać się na event?
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex justify-center gap-4 pt-2">
          <Button variant="outline" onClick={onClose}>
            Anuluj
          </Button>
          <Button onClick={onConfirm}>
            Zapisz się
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
