import useLeaveChat from '../../hooks/useLeaveChat.ts';
import { ID } from '../../types/types.ts';

interface LeaveChatButtonProps {
  chatId: ID;
}

const LeaveChatButton = ({ chatId }: LeaveChatButtonProps) => {
  const { isConfirming, startConfirming, cancelLeave, confirmLeave } =
    useLeaveChat();

  const handleConfirmLeave = () => {
    confirmLeave(chatId);
  };

  return (
    <div className="ml-auto">
      {!isConfirming ? (
        <button onClick={startConfirming} className="text-red-500">
          Leave chat
        </button>
      ) : (
        <div className="flex items-center">
          <span className="text-red-500 mr-2">
            Do you really want to leave this chat?
          </span>
          <button
            onClick={handleConfirmLeave}
            className="bg-red-500 text-white rounded px-2 mr-2"
          >
            Yes
          </button>
          <button
            onClick={cancelLeave}
            className="bg-gray-500 text-white rounded px-2"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaveChatButton;
