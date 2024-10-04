"use client";
import { ICONS } from "@/shared/utils/icons";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {Newsletter as NewsletterModel} from '../../../../models/newsletters';


const Write = () => {
  const [emailTitle, setEmailTitle] = useState("");
  const [newsletters, setNewsletter] = useState<NewsletterModel[]>([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useClerk();

  const handleCreate = () => {
    if (emailTitle.length === 0) {
      toast.error("Enter the email subject to continue!");
    } else {
      const formattedTitle = emailTitle.replace(/\s+/g, "-").replace(/&/g, "-");
      router.push(`/dashboard/new-email?subject=${formattedTitle}`);
    }
  };

  useEffect(() => {
    Findnewsletters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

   

  const Findnewsletters = async () => {
    try {
      const response = await fetch(`http://localhost:5000/newsletters/newsLetterOwnerId=${user?.id}`,{ method: "GET"}

      );
      if (!response.ok) {
        throw new Error("Failed to fetch newsletters");
      }
      const newsletters = await response.json();
      setNewsletter(newsletters);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      setNewsletter([]);
    }
  };
  

  const deleteHandler = async (_id: string) => {
  console.log('_id:', _id);
  try {
    const response = await fetch(`http://localhost:5000/newsletters/${_id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (response.ok) {
      console.log(result.message); // Log du message de succès
      toast.success("Newsletter supprimée avec succès");
      Findnewsletters(); // Met à jour la liste des newsletters après suppression
    } else {
      console.error(result.message); // Log en cas d'erreur
      toast.error("Échec de la suppression de la newsletter");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    toast.error("Une erreur est survenue lors de la suppression");
  }
};

  

  return (
    <div className="w-full flex p-5 flex-wrap gap-6 relative">
      <div
        className="w-[200px] h-[200px] bg-slate-50 flex flex-col items-center justify-center rounded border cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-2xl block text-center mb-3">{ICONS.plus} </span>
        <h5 className="text-2xl">Create New</h5>
      </div>

      {newsletters &&
        newsletters.map((i: any) => {
          const formattedTitle = i?.title
            ?.replace(/\s+/g, "-")
            .replace(/&/g, "-");
          return (
            <div
              key={i?._id}
              className="w-[200px] h-[200px] z-[0] relative bg-slate-50 flex flex-col items-center justify-center rounded border cursor-pointer"
            >
              <span
                className="absolute block z-20 right-2 top-2 text-2xl cursor-pointer"
                onClick={() => deleteHandler(i?._id)}
              >
                {ICONS.delete}
              </span>
              <Link
                href={`/dashboard/new-email?subject=${formattedTitle}`}
                className="text-xl"
              >
                {i.title}
              </Link>
            </div>
          );
        })}

      {open && (
        <div className="absolute flex items-center justify-center top-0 left-0 bg-[#00000028] h-screen w-full">
          <div className="w-[600px] p-5 bg-white rounded shadow relative">
            <div className="absolute top-3 right-3">
              <span
                className="text-lg cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                {ICONS.cross}
              </span>
            </div>
            <h5 className="text-2xl">Enter your Email subject</h5>
            <input
              type="text"
              className="border w-full my-2 h-[35px] px-2 outline-none"
              value={emailTitle}
              onChange={(e) => setEmailTitle(e.target.value)}
            />
            <Button
              color="primary"
              className="rounded text-xl mt-3"
              onClick={handleCreate}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Write;
