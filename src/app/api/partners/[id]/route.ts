import { NextResponse } from 'next/server';
import { PartnerService } from '@/services/partnerService';
import { PartnerUpdateInput } from '@/models/Partner';

const partnerService = new PartnerService();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const partner = await partnerService.getPartner(params.id);
    if (!partner) {
      return NextResponse.json(
        { message: 'Partner not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch partner' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data: PartnerUpdateInput = await request.json();
    const partner = await partnerService.updatePartner(params.id, data);
    return NextResponse.json(partner);
  } catch (error) {
    if (error instanceof Error && error.message === 'Partner not found') {
      return NextResponse.json(
        { message: 'Partner not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Failed to update partner' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await partnerService.deletePartner(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Partner not found') {
      return NextResponse.json(
        { message: 'Partner not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Failed to delete partner' },
      { status: 500 }
    );
  }
} 