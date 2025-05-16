import { NextResponse } from 'next/server';
import { MemberService } from '@/services/memberService';
import { MemberCreateInput } from '@/models/Member';

const memberService = new MemberService();

export async function GET() {
  try {
    const members = await memberService.getAllMembers();
    return NextResponse.json(members);
  } catch (err) {
    console.error("Failed to fetch members:", err);
    return NextResponse.json(
      { message: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as MemberCreateInput;
    const member = await memberService.createMember(data);
    return NextResponse.json(member);
  } catch (err) {
    console.error("Failed to create member:", err);
    return NextResponse.json(
      { message: 'Failed to create member' },
      { status: 500 }
    );
  }
} 