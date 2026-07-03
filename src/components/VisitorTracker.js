"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    // Only track if not visited in the current session
    if (typeof window !== "undefined" && !sessionStorage.getItem("lg_visited")) {
      fetch("/api/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            sessionStorage.setItem("lg_visited", "true");
          }
        })
        .catch((err) => console.error("Error logging visit:", err));
    }
  }, []);

  return null;
}
