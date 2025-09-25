import React, { createContext, useContext, useState } from 'react';

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  services: string[];
  active: boolean;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: StaffMember | null;
  userType: 'owner' | 'staff' | null;
}

interface StaffContextType {
  staffMembers: StaffMember[];
  addStaffMember: (staff: Omit<StaffMember, 'id'>) => void;
  updateStaffMember: (id: string, updates: Partial<StaffMember>) => void;
  deleteStaffMember: (id: string) => void;
  toggleStaffActive: (id: string) => void;
  
  // Authentication
  authState: AuthState;
  login: (email: string, password: string, userType: 'owner' | 'staff') => boolean;
  logout: () => void;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: "staff-001",
      name: "Sarah Johnson",
      email: "sarah@salon.com",
      role: "Senior Stylist",
      services: ["Haircut", "Color", "Styling"],
      active: true,
      password: "staff123"
    },
    {
      id: "staff-002",
      name: "Alex Chen",
      email: "alex@salon.com",
      role: "Barber",
      services: ["Men's Haircut", "Beard Trim"],
      active: true,
      password: "staff123"
    },
    {
      id: "staff-003",
      name: "Maria Rodriguez",
      email: "maria@salon.com",
      role: "Spa Specialist",
      services: ["Spa Treatment", "Facial"],
      active: true,
      password: "staff123"
    }
  ]);

  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    userType: null
  });

  // Owner credentials (hardcoded for demo)
  const ownerCredentials = {
    email: "owner@salon.com",
    password: "owner123"
  };

  const addStaffMember = (staffData: Omit<StaffMember, 'id'>) => {
    const newStaff: StaffMember = {
      ...staffData,
      id: `staff-${String(staffMembers.length + 1).padStart(3, '0')}`
    };
    setStaffMembers(prev => [...prev, newStaff]);
  };

  const updateStaffMember = (id: string, updates: Partial<StaffMember>) => {
    setStaffMembers(prev =>
      prev.map(staff => staff.id === id ? { ...staff, ...updates } : staff)
    );
  };

  const deleteStaffMember = (id: string) => {
    setStaffMembers(prev => prev.filter(staff => staff.id !== id));
    
    // If the deleted staff member is currently logged in, log them out
    if (authState.user?.id === id) {
      logout();
    }
  };

  const toggleStaffActive = (id: string) => {
    setStaffMembers(prev =>
      prev.map(staff =>
        staff.id === id ? { ...staff, active: !staff.active } : staff
      )
    );
    
    // If the deactivated staff member is currently logged in, log them out
    const staff = staffMembers.find(s => s.id === id);
    if (staff && !staff.active && authState.user?.id === id) {
      logout();
    }
  };

  const login = (email: string, password: string, userType: 'owner' | 'staff'): boolean => {
    if (userType === 'owner') {
      if (email === ownerCredentials.email && password === ownerCredentials.password) {
        setAuthState({
          isAuthenticated: true,
          user: {
            id: 'owner',
            name: 'Owner',
            email: ownerCredentials.email,
            role: 'Owner',
            services: [],
            active: true,
            password: ''
          },
          userType: 'owner'
        });
        return true;
      }
    } else {
      const staff = staffMembers.find(s => 
        s.email === email && s.password === password && s.active
      );
      if (staff) {
        setAuthState({
          isAuthenticated: true,
          user: staff,
          userType: 'staff'
        });
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      userType: null
    });
  };

  return (
    <StaffContext.Provider value={{
      staffMembers,
      addStaffMember,
      updateStaffMember,
      deleteStaffMember,
      toggleStaffActive,
      authState,
      login,
      logout
    }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (context === undefined) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};