import { useState, useEffect } from 'react';
import { Member, MemberCreateInput, MemberUpdateInput } from '@/models/Member';

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/members');
      if (!response.ok) throw new Error('Failed to fetch members');
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createMember = async (data: MemberCreateInput) => {
    try {
      setError(null);
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
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateMember = async (id: string, data: MemberUpdateInput) => {
    try {
      setError(null);
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
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteMember = async (id: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete member');
      setMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return {
    members,
    loading,
    error,
    fetchMembers,
    createMember,
    updateMember,
    deleteMember,
  };
} 