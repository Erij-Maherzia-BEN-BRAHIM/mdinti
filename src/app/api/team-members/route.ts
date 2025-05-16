import { NextResponse } from 'next/server';
import { TeamMemberService } from '@/services/teamMemberService';
import { TeamMemberCreateInput } from '@/models/TeamMember';

const teamMemberService = new TeamMemberService();

export async function GET() {
  try {
    const members = await teamMemberService.getAllTeamMembers();
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data: TeamMemberCreateInput = await request.json();
    const member = await teamMemberService.createTeamMember(data);
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create team member' },
      { status: 500 }
    );
  }
} 