// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [habits, setHabits] = useState<any[]>([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    const { data, error } = await supabase.from("habits").select("*");
    if (data) setHabits(data);
  };

  const addHabit = async () => {
    if (!newHabit) return;
    const { data, error } = await supabase.from("habits").insert([{ name: newHabit }]);
    if (!error) {
      setHabits([...habits, ...(data || [])]);
      setNewHabit("");
    }
  };

  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1>Seus Hábitos</h1>
      <input
        type="text"
        placeholder="Novo hábito"
        value
