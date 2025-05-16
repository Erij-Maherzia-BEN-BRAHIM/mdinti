import { NextResponse } from 'next/server';
import { PartnerService } from '@/services/partnerService';
import { PartnerCreateInput } from '@/models/Partner';

const partnerService = new PartnerService();

export async function GET() {
  try {
    const partners = await partnerService.getAllPartners();
    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data: PartnerCreateInput = await request.json();
    const partner = await partnerService.createPartner(data);
    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create partner' },
      { status: 500 }
    );
  }
} 