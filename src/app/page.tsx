"use client";
import Image from "next/image";
import supabase from "../../supabaseClient";
import { useEffect, useState } from "react";
import SmoothieCard from "@/components/SmoothieCard";

export default function Home() {
  const [fetchError, setFetchError] = useState("");
  const [smoothies, setSmoothies] = useState<Array<any>>([]);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id: number | string) => {
    setSmoothies((prev) => {
      return prev?.filter((sm) => sm.id !== id);
    });
  };

  const fetchSmoothies = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .select()
      .order(orderBy, { ascending: false });

    if (error) {
      setFetchError("could not fetch smoothies");
      setSmoothies([]);
      console.log(fetchError);
    }
    if (data) {
      setSmoothies(data);
      setFetchError("");
    }
  };

  useEffect(() => {
    fetchSmoothies();
  }, [orderBy]);

  // console.log("smoothies: ", smoothies);

  // console.log(supabase);
  return (
    <main className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("title")}>Title</button>
            <button onClick={() => setOrderBy("rating")}>Rating</button>
          </div>
          <div className="smoothie-grid">
            {smoothies?.map((smoothie) => (
              <SmoothieCard
                smoothie={smoothie}
                key={smoothie.id}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
