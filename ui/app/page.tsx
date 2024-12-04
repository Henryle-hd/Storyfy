import AudioCreated from "@/components/AudioCreated";
// import SystemOutput from "@/components/SystemOutput";
import UserArg from "@/components/UserArg";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center">
      <AudioCreated />
      <UserArg />
      {/* <SystemOutput /> */}
    </div>
  );
}
