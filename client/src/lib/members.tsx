import { createContext, useContext, useState, ReactNode } from 'react';
import boyImage from "@assets/generated_images/male_pop_idol_portrait.png";
import girlImage from "@assets/generated_images/female_pop_idol_portrait.png";

export interface Member {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  stats: {
    age: string;
    height: string;
    zodiac: string;
  };
}

interface MembersContextType {
  members: Member[];
  updateMember: (id: number, updates: Partial<Member>) => void;
}

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Izumi",
      role: "Vocalist & Dancer",
      image: boyImage,
      bio: "The soulful voice of Lumora. Izumi brings passion and intensity to every performance.",
      stats: { age: "22", height: "182cm", zodiac: "Scorpio" }
    },
    {
      id: 2,
      name: "Shoxina",
      role: "Visual & Dancer",
      image: girlImage,
      bio: "The elegant and captivating dancer who brings every song to life with her graceful movements.",
      stats: { age: "20", height: "165cm", zodiac: "Virgo" }
    },
    {
      id: 3,
      name: "Daler",
      role: "Producer & Rapper",
      image: boyImage,
      bio: "The creative genius behind the beats. Daler crafts the unique soundscape that defines Lumora's identity.",
      stats: { age: "23", height: "185cm", zodiac: "Leo" }
    },
    {
      id: 4,
      name: "Miyamura",
      role: "Rapper & Visual",
      image: girlImage,
      bio: "The charismatic visual with a flow that cuts through the noise. Miyamura defines the style of Lumora.",
      stats: { age: "21", height: "168cm", zodiac: "Libra" }
    }
  ]);

  const updateMember = (id: number, updates: Partial<Member>) => {
    setMembers(currentMembers => 
      currentMembers.map(member => 
        member.id === id 
          ? { ...member, ...updates, stats: { ...member.stats, ...updates.stats } } 
          : member
      )
    );
  };

  return (
    <MembersContext.Provider value={{ members, updateMember }}>
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error('useMembers must be used within a MembersProvider');
  }
  return context;
}
