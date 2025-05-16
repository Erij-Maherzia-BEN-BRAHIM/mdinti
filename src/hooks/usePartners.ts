import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Partner, PartnerCreateInput, PartnerUpdateInput } from '@/models/Partner';

const API_URL = '/api/partners';

export function usePartners() {
  const queryClient = useQueryClient();

  const { data: partners, isLoading: isLoadingPartners } = useQuery<Partner[]>({
    queryKey: ['partners'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch partners');
      return response.json();
    },
  });

  const createPartner = useMutation({
    mutationFn: async (data: PartnerCreateInput) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create partner');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });

  const updatePartner = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PartnerUpdateInput }) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update partner');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });

  const deletePartner = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete partner');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });

  return {
    partners,
    isLoadingPartners,
    createPartner,
    updatePartner,
    deletePartner,
  };
} 