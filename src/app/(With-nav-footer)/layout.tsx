import Navbar from "@/app/components/Navbar";
import BotNavMob from "@/app/components/BotNavMob";
const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Navbar />
      {children}
      <BotNavMob />
    </div>
  );
};

export default RootLayout;
