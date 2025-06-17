import { create } from 'zustand';

export type CheckStatus = 'pending' | 'approved' | 'rejected';

export interface UploadedCheck {
  id: string;
  imageUrl: string;
  uploadedAt: string;
  status: CheckStatus;
}

interface CheckStore {
  checks: UploadedCheck[];
  addCheck: (check: UploadedCheck) => void;
  updateCheckStatus: (id: string, status: CheckStatus) => void;
}

export const useCheckStore = create<CheckStore>((set) => ({
  checks: [],
  addCheck: (check) =>
    set((state) => ({
      checks: [...state.checks, check],
    })),
  updateCheckStatus: (id, status) =>
    set((state) => ({
      checks: state.checks.map((check) => (check.id === id ? { ...check, status } : check)),
    })),
}));
