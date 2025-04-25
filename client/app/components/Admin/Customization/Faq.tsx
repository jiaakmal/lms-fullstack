"use client";

import { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";

interface FAQItem {
  question: string;
  answer: string;
}

const EditFAQ = () => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ");
  const [editLayout] = useEditLayoutMutation();

  const [faqList, setFaqList] = useState<FAQItem[]>([]);
  const [newFaq, setNewFaq] = useState<FAQItem | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [editStates, setEditStates] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (data?.data?.faq) {
      // Deep clone to avoid frozen object issue
      const clonedFaq = JSON.parse(JSON.stringify(data.data.faq));
      setFaqList(clonedFaq);
    }
  }, [data]);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleFaqChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updated = [...faqList];
    updated[index][field] = value;
    setFaqList(updated);
    setEditStates((prev) => ({ ...prev, [index]: true })); // track change
  };

  const handleDeleteFaq = async (index: number) => {
    const updated = faqList.filter((_, i) => i !== index);
    await editLayout({ type: "FAQ", faq: updated });
    setFaqList(updated);
    toast.success("FAQ deleted");
    setExpandedIndex(null);
  };

  const handleAddFaq = () => {
    setNewFaq({ question: "", answer: "" });
  };

  const handleSaveNewFaq = async () => {
    if (!newFaq?.question.trim() || !newFaq?.answer.trim()) {
      toast.error("Please fill in both question and answer.");
      return;
    }

    const updated = [...faqList, newFaq];
    try {
      await editLayout({ type: "FAQ", faq: updated }).unwrap();
      toast.success("FAQ added successfully");
      setFaqList(updated);
      setNewFaq(null);
    } catch {
      toast.error("Failed to add FAQ");
    }
  };

  const handleUpdateFaq = async (index: number) => {
    try {
      await editLayout({ type: "FAQ", faq: faqList }).unwrap();
      toast.success("FAQ updated");
      setEditStates((prev) => ({ ...prev, [index]: false }));
    } catch {
      toast.error("Failed to update FAQ");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mt-26 mx-auto bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Manage FAQs
      </h2>

      {faqList.map((item, index) => (
        <div key={index} className="mb-6">
          {/* Question input */}
          <div
            className="flex justify-between items-center cursor-pointer border-b pb-2"
            onClick={() => handleToggle(index)}
          >
            <input
              value={item.question}
              onChange={(e) =>
                handleFaqChange(index, "question", e.target.value)
              }
              className="w-full bg-transparent text-lg font-medium text-gray-800 dark:text-white focus:outline-none  "
              placeholder="Enter question"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFaq(index);
              }}
              className="text-gray-500 ml-2"
              title="Delete"
            >
              <AiOutlineDelete size={18} />
            </button>
          </div>

          {/* Answer input if expanded */}
          {expandedIndex === index && (
            <div className="mt-2">
              <textarea
                value={item.answer}
                onChange={(e) =>
                  handleFaqChange(index, "answer", e.target.value)
                }
                className="w-full mt-1 text-sm bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none border-b"
                placeholder="Enter answer"
              />
              {editStates[index] && (
                <button
                  onClick={() => handleUpdateFaq(index)}
                  className="mt-2 px-3 py-1 bg-transparent text-white text-sm rounded hover:bg-gray-800 hover:text-white"
                >
                  Save
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {/* New FAQ form */}
      {newFaq && (
        <div className="border-t pt-4 mt-6">
          <input
            type="text"
            value={newFaq.question}
            onChange={(e) =>
              setNewFaq({ ...newFaq, question: e.target.value })
            }
            placeholder="New Question"
            className="w-full bg-transparent text-lg font-medium text-gray-800 dark:text-white border-b mb-2 focus:outline-none"
          />
          <textarea
            value={newFaq.answer}
            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
            placeholder="New Answer"
            className="w-full bg-transparent text-sm text-gray-700 dark:text-gray-300 border-b mb-2 focus:outline-none"
          />
          <button
            onClick={handleSaveNewFaq}
            className="px-4 py-1 bg-transparent text-white rounded hover:bg-gray-800 hover:text-white"
            disabled={!newFaq.question || !newFaq.answer}
          >
            Save
          </button>
        </div>
      )}

      {/* Add FAQ Button */}
      {!newFaq && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleAddFaq}
            className="flex items-center gap-2 text-white font-medium"
          >
            <AiOutlinePlus /> Add FAQ
          </button>
        </div>
      )}
    </div>
  );
};

export default EditFAQ;
