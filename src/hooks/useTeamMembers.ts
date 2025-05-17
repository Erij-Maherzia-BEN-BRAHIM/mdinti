import { useState, useEffect } from 'react';
import { TeamMember, TeamMemberCreateInput, TeamMemberUpdateInput } from '@/models/TeamMember';

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      setIsLoadingMembers(true);
      const response = await fetch('/api/team-members');
      if (!response.ok) throw new Error('Failed to fetch team members');
      const data = await response.json();
      setMembers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch team members');
    } finally {
      setIsLoadingMembers(false);
    }
  };

  const createMember = async (data: TeamMemberCreateInput) => {
    try {
      const response = await fetch('/api/team-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create team member');
      const newMember = await response.json();
      setMembers((prev) => [newMember, ...prev]);
      return newMember;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create team member');
    }
  };

  const updateMember = async (id: string, data: TeamMemberUpdateInput) => {
    try {
      const response = await fetch(`/api/team-members/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update team member');
      const updatedMember = await response.json();
      setMembers((prev) =>
        prev.map((member) =>
          member.id === id ? updatedMember : member
        )
      );
      return updatedMember;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update team member');
    }
  };

  const deleteMember = async (id: string) => {
    try {
      const response = await fetch(`/api/team-members/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete team member');
      setMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete team member');
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