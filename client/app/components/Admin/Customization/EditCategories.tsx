"use client";

import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-hot-toast";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";

const EditCategories = () => {
  const { data, isLoading } = useGetHeroDataQuery("Categories");
  const [editLayout] = useEditLayoutMutation();

  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");

  useEffect(() => {
    if (data?.data?.categories) {
      // Deep clone to avoid mutations on frozen objects
      const cloned = JSON.parse(JSON.stringify(data.data.categories));
      setCategories(cloned.map((item: any) => item.title));
    }
  }, [data]);

  const handleDelete = async (index: number) => {
    const updated = [...categories];
    updated.splice(index, 1);
    setCategories(updated);
    await editLayout({
      type: "Categories",
      categories: updated.map((title) => ({ title })),
    });
    toast.success("Category deleted");
  };

  const handleAdd = async () => {
    if (!newCategory.trim()) {
      toast.error("Category title required");
      return;
    }
    const updated = [...categories, newCategory.trim()];
    const res: any = await editLayout({
      type: "Categories",
      categories: updated.map((title) => ({ title })),
    });

    if (res?.data?.success) {
      toast.success("Category added");
      setCategories(updated);
      setNewCategory("");
    } else {
      toast.error("Failed to add category");
    }
  };

  const handleEdit = (index: number, value: string) => {
    const updated = [...categories];
    updated[index] = value;
    setCategories(updated);
  };

  const handleSaveEdit = async () => {
    await editLayout({
      type: "Categories",
      categories: categories.map((title) => ({ title })),
    });
    toast.success("Categories updated");
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="mt-30 text center m-30">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        All Categories
      </h2>

      {categories.map((cat, index) => (
        <div 
          key={index}
          className="flex items-center justify-center p-5 mb-3"
        >
          <input
            value={cat}
            onChange={(e) => handleEdit(index, e.target.value)}
            onBlur={handleSaveEdit}
            placeholder="Category Title"
            className=" bg-transparent text-gray-800 dark:text-white focus:outline-none"
          />
          <button
            onClick={() => handleDelete(index)}
            className="text-gray-200 ml-3"
          >
            <AiOutlineDelete />
          </button>
        </div>
      ))}

      <div className="flex items-center justify-center p-5 mb-3 mt-5">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
          className="bg-transparent text-gray-800 dark:text-white focus:outline-none "
        />
<div className="flex justify-center items-center mt-6">
<button
          onClick={handleAdd}
          className="flex items-center gap-2 text-white font-medium disabled:opacity-50"
          disabled={!newCategory.trim()}
        >
          +Add 
        </button>
</div>
      </div>
    </div>
  );
};

export default EditCategories;
