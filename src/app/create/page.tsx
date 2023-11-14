"use client";
import { FormEvent, useState } from "react";
import supabase from "../../../supabaseClient";
import { useRouter } from "next/navigation";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState("");

  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }
    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating }])
      .select();

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly.");
    }
    if (data) {
      console.log(data);
      setFormError("");
      router.push("/");
    }
  }

  return (
    <main className="page create">
      <div className="page create">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="method">Method:</label>
          <textarea
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />

          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <button>Create Smoothie Recipe</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    </main>
  );
}
