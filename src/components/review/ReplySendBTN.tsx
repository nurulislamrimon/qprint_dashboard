import { clearReplyData, setReply } from "@/store/features/review/replySlice";
import { useUpdateReviewMutation } from "@/store/features/review/reviewApi";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { IconSend } from "@tabler/icons-react";

const ReplySendBTN = (id: { id: string }) => {
  const dispatch = useAppDispatch();
  const { reply } = useAppSelector((state) => state.reply);

  const [updateReview] = useUpdateReviewMutation();

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {      
    e.preventDefault();
    try {
      const res = await updateReview({ reply, id: id.id });
      clearReplyData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border flex items-center gap-2 px-4 py-2 rounded-xl"
    >
      <input
        type="text"
        placeholder="type Reply"
        className="w-full outline-none border-none"
        onChange={(e) => dispatch(setReply(e.target.value))}
      />
      <button type="submit" className="main-bg-color p-2 rounded-xl">
        {""}
        <span className="text-white">
          <IconSend width={24} height={24} />
        </span>
      </button>
    </form>
  );
};

export default ReplySendBTN;
