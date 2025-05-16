import { NextResponse } from 'next/server';
import { TeamMemberService } from '@/services/teamMemberService';
import { TeamMemberUpdateInput } from '@/models/TeamMember';

const teamMemberService = new TeamMemberService();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const member = await teamMemberService.getTeamMember(params.id);
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch team member' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data: TeamMemberUpdateInput = await request.json();
    const member = await teamMemberService.updateTeamMember(params.id, data);
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await teamMemberService.deleteTeamMember(params.id);
    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete team member' },
      { status: 500 }
    );
  }
} 