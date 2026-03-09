/** Thin wrapper — all logic lives in PostFormModal */
import PostFormModal, { PostFormPost } from "@/components/posts/PostFormModal";
import { useProfile } from "@/context/ProfileContext";

interface EditPostModalProps {
  open: boolean;
  post: PostFormPost | null;
  onClose: () => void;
  onPostUpdated?: () => void;
}

const EditPostModal = ({
  open,
  post,
  onClose,
  onPostUpdated,
}: EditPostModalProps) => {
  const { profile } = useProfile();
  return (
    <PostFormModal
      open={open}
      post={post}
      onClose={onClose}
      onSuccess={onPostUpdated}
      userName={profile?.user?.name}
      userAvatar={profile?.profile_picture}
    />
  );
};

export default EditPostModal;
