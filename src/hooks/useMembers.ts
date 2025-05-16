import { useState, useEffect } from 'react';
import { Member, MemberCreateInput, MemberUpdateInput } from '@/models/Member';

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      setIsLoadingMembers(true);
      const response = await fetch('/api/members');
      if (!response.ok) throw new Error('Failed to fetch members');
      const data = await response.json();
      setMembers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch members');
    } finally {
      setIsLoadingMembers(false);
    }
  };

  const createMember = async (data: MemberCreateInput) => {
    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create member');
      const newMember = await response.json();
      setMembers((prev) => [newMember, ...prev]);
      return newMember;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create member');
    }
  };

  const updateMember = async (id: string, data: MemberUpdateInput) => {
    try {
      const response = await fetch(`/api/members/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update member');
      const updatedMember = await response.json();
      setMembers((prev) =>
        prev.map((member) =>
          member.id === id ? updatedMember : member
        )
      );
      return updatedMember;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update member');
    }
  };

  const deleteMember = async (id: string) => {
    try {
      const response = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete member');
      setMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete member');
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return {
    members,
    isLoadingMembers,
    error,
    createMember,
    updateMember,
    deleteMember,
    refreshMembers: fetchMembers,
  };
} 