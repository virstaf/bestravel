"use client";
// NoteTextBox.jsx

import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { loadNotesAction, saveNoteAction } from "@/actions/admin/notes";
import { getAdminUser } from "@/lib/supabase/admin/server";
import { toast } from "sonner";

const NoteTextBox = () => {
  const pathname = usePathname(); // Gets current route like '/admin/reservations/REQ-001'
  const [note, setNote] = useState("");
  const [adminId, setAdminId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getPageId = () => {
    const segments = pathname.split("/");
    return segments[segments.length - 1]; // Last segment
  };

  useEffect(() => {
    getAdminId();
  }, [pathname]);

  useEffect(() => {
    loadNotes();
  }, [pathname]);

  const getAdminId = async () => {
    const user = await getAdminUser();
    setAdminId(user?.id);
    return user?.id;
  };

  const loadNotes = async () => {
    if (!pathname) return;
    const id = await getAdminId();
    setIsLoading(true);

    let message = "";
    try {
      const data = await loadNotesAction(pathname, adminId || id);
      setNote(data.note || "");
      message = data.message;
      if (!data.success) {
        toast.error(message || "Failed to load note");
      }
      if (data.success) {
        toast.success(message || "Note loaded successfully");
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
    setIsLoading(false);
  };

  const saveNote = async () => {
    if (!pathname) return;

    setIsSaving(true);
    let message = "";
    try {
      const data = await saveNoteAction(getPageId(), pathname, adminId, note);
      message = data.message;
      if (!data.success) {
        toast.error(message || "Failed to save note");
      }
      if (data.success) {
        toast.success(message || "Note saved successfully");
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
    setIsSaving(false);
  };

  const clearNote = () => {
    setNote("");
  };

  return (
    <div className="max-w-md">
      <Textarea
        className="w-full h-[180px] p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        placeholder="Enter your notes here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        disabled={isLoading || isSaving}
      ></Textarea>
      <div className="flex gap-4 mt-4">
        <Button
          className="border-blue-300 text-blue-500 hover:border-blue-700 hover:text-blue-700"
          variant="outline"
          onClick={saveNote}
          disabled={isLoading || isSaving}
        >
          Save Note
        </Button>
        <Button
          className="border-red-300 text-red-500 hover:border-red-600 hover:text-red-600"
          variant="outline"
          onClick={clearNote}
        >
          Clear Note
        </Button>
      </div>
    </div>
  );
};

export default NoteTextBox;
