/** Thin wrapper — all logic lives in PostFormModal */
import PostFormModal from "@/components/posts/PostFormModal";

interface AdminCreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

const AdminCreatePostModal = ({
  open,
  onClose,
  onPostCreated,
}: AdminCreatePostModalProps) => (
  <PostFormModal open={open} onClose={onClose} onSuccess={onPostCreated} />
);

export default AdminCreatePostModal;
