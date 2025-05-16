import { ObjectId } from 'mongodb';
import { Partner, PartnerCreateInput, PartnerUpdateInput } from '@/models/Partner';
import clientPromise from '@/lib/db';

export class PartnerService {
  private async getCollection() {
    const client = await clientPromise;
    const db = client.db();
    return db.collection<Omit<Partner, 'id'> & { _id: ObjectId }>('partners');
  }

  async getAllPartners(): Promise<Partner[]> {
    const collection = await this.getCollection();
    const partners = await collection.find().sort({ createdAt: -1 }).toArray();
    return partners.map(({ _id, ...partner }) => ({
      ...partner,
      id: _id.toString(),
    }));
  }

  async getPartner(id: string): Promise<Partner> {
    const collection = await this.getCollection();
    const partner = await collection.findOne({ _id: new ObjectId(id) });
    if (!partner) throw new Error('Partner not found');
    const { _id, ...partnerData } = partner;
    return {
      ...partnerData,
      id: _id.toString(),
    };
  }

  async createPartner(data: PartnerCreateInput): Promise<Partner> {
    const collection = await this.getCollection();
    const now = new Date();
    const result = await collection.insertOne({
      _id: new ObjectId(),
      ...data,
      createdAt: now,
      updatedAt: now,
    });
    return {
      ...data,
      id: result.insertedId.toString(),
      createdAt: now,
      updatedAt: now,
    };
  }

  async updatePartner(id: string, data: PartnerUpdateInput): Promise<Partner> {
    const collection = await this.getCollection();
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );
    if (!result) throw new Error('Partner not found');
    const { _id, ...partnerData } = result;
    return {
      ...partnerData,
      id: _id.toString(),
    };
  }

  async deletePartner(id: string): Promise<void> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw new Error('Partner not found');
  }
} 