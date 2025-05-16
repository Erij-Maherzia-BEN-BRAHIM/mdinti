import { NextResponse } from 'next/server';
import { MemberService } from '@/services/memberService';
import { MemberUpdateInput } from '@/models/Member';

const memberService = new MemberService();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const member = await memberService.getMember(params.id);
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch member' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data: MemberUpdateInput = await request.json();
    const member = await memberService.updateMember(params.id, data);
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update member' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await memberService.deleteMember(params.id);
    return NextResponse.json({ message: 'Member deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete member' },
      { status: 500 }
    );
  }
} 