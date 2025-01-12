import { Profile } from "@/components/profile/profile";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ uid: string }>;
}) => {
  const { uid } = (await params) as { uid: string };
  return <Profile uid={uid} />;
};

export default ProfilePage;
