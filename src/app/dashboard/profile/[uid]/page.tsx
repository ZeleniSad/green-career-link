import { Profile } from "@/components/profile/profile";

const ProfilePage = async ({ params }: { params: string }) => {
  const { uid } = await params;
  return <Profile uid={uid} />;
};

export default ProfilePage;
