import Navbar from "@/components/Navbar";
import BotNavMob from "@/components/BotNavMob";
const RootLayout = ({children,}: Readonly<{children: React.ReactNode;}>) => {
  return (
<div>
 <Navbar />
          {children}
          <BotNavMob />
</div>
       
         
        
   
  );
};

export default RootLayout;