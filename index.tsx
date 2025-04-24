
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const habits = ["Espiritualidade", "Alimentação", "Atividade Física", "Leitura", "Sono", "Organização"];

export default function Home() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) fetchData(user.id);
    });
  }, []);

  const fetchData = async (userId) => {
    const { data } = await supabase.from("habits").select("*").eq("user_id", userId).single();
    if (data) setData(data.habits || {});
  };

  const updateHabit = async (habit, value) => {
    const newHabits = { ...data, [habit]: value };
    setData(newHabits);
    await supabase.from("habits").upsert({ user_id: user.id, habits: newHabits });
  };

  const login = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <div style={{ padding: 20 }}>
      {!user ? (
        <button onClick={login}>Login com Google</button>
      ) : (
        <div>
          <h1>Meus Hábitos</h1>
          <ul>
            {habits.map((habit) => (
              <li key={habit}>
                <label>
                  <input
                    type="checkbox"
                    checked={data[habit] || false}
                    onChange={(e) => updateHabit(habit, e.target.checked)}
                  />
                  {habit}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
