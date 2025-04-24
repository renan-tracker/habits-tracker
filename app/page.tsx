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
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      <button onClick={addHabit} style={{ padding: "0.5rem 1rem" }}>
        Adicionar
      </button>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>{habit.name}</li>
        ))}
      </ul>
    </main>
  );
}
