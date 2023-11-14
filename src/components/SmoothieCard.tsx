import Link from "next/link";
import React from "react";
import { FiEdit } from "react-icons/fi";
import supabase from "../../supabaseClient";

type ISmoothieCardsProps = {
  id?: number;
  title: string;
  method: string;
  rating: Number;
};

const SmoothieCard = ({ smoothie, onDelete }: ISmoothieCardsProps | any) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      onDelete(smoothie.id);
    }
  };

  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons p-2">
        <Link href={"/update/" + smoothie.id}>
          <FiEdit size={20} color={"#c1c4f2"} />
        </Link>
        <button onClick={handleDelete}>delete </button>
      </div>
    </div>
  );
};

export default SmoothieCard;
