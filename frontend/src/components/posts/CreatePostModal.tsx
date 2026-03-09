/** Thin wrapper — all logic lives in PostFormModal */
import PostFormModal from "@/components/posts/PostFormModal";
import { useProfile } from "@/context/ProfileContext";

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

const CreatePostModal = ({
  open,
  onClose,
  onPostCreated,
}: CreatePostModalProps) => {
  const { profile } = useProfile();
  return (
    <PostFormModal
      open={open}
      onClose={onClose}
      onSuccess={onPostCreated}
      userName={profile?.user?.name}
      userAvatar={profile?.profile_picture}
    />
  );
};

export default CreatePostModal;
