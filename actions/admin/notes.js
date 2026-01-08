"use server";

import { createAdminClient } from "@/lib/supabase/admin/server";

export const loadNotesAction = async (pathname, adminId) => {
  try {
    const supabase = await createAdminClient();

    if (!adminId) {
      return {
        success: false,
        message: "Admin authentication required",
        note: "",
      };
    }

    const { data, error } = await supabase
      .from("admin_notes")
      .select("note_content")
      .eq("page_path", pathname)
      .eq("admin_id", adminId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned
      console.error("Error: no rows returned::", error);
      return { success: false, message: "Error loading note", note: "" };
    } else {
      return {
        success: true,
        message: "Note loaded successfully",
        note: data?.note_content || "",
      };
    }
    // return "The look, of a note";
  } catch (error) {
    console.error("Error loading note:", error);
    return { success: false, message: "Error loading note", note: "" };
  }
};

export const saveNoteAction = async (
  pageId,
  pathname,
  adminId,
  noteContent
) => {
  // console.log("saveNoteAction called with:", { pageId, pathname, adminId, noteContent });
  try {
    const supabase = await createAdminClient();
    const { data: existingNote, error: fetchError } = await supabase
      .from("admin_notes")
      .select("id")
      .eq("page_id", pageId)
      .eq("admin_id", adminId)
      .single();
    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking existing note:", fetchError);
      return { success: false, message: "Error saving note" };
    }
    if (existingNote) {
      const { error: updateError } = await supabase
        .from("admin_notes")
        .update({ note_content: noteContent })
        .eq("id", existingNote.id);
      if (updateError) {
        console.error("Error updating note:", updateError);
        return { success: false, message: "Error updating note" };
      }
      return { success: true, message: "Note updated successfully" };
    } else {
      const { error: insertError } = await supabase.from("admin_notes").insert({
        page_path: pathname,
        admin_id: adminId,
        page_id: pageId,
        note_content: noteContent,
      });

      if (insertError) {
        console.error("Error inserting note:", insertError);
        return { success: false, message: "Error inserting note" };
      }
      return { success: true, message: "Note saved successfully" };
    }
  } catch (error) {
    console.error("Error saving note:", error);
    return { success: false, message: "Error saving note" };
  }
};
