import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db';
import { Member, MemberCreateInput, MemberUpdateInput } from '@/models/Member';

export class MemberService {
  private async getCollection() {
    const client = await clientPromise;
    const db = client.db();
    return db.collection<Omit<Member, "id"> & { _id: ObjectId }>("members");
  }

  async getAllMembers(): Promise<Member[]> {
    const collection = await this.getCollection();
    const members = await collection.find().sort({ createdAt: -1 }).toArray();
    return members.map(({ _id, ...member }) => ({
      ...member,
      id: _id.toString(),
    }));
  }

  async getMember(id: string): Promise<Member> {
    const collection = await this.getCollection();
    const member = await collection.findOne({ _id: new ObjectId(id) });
    if (!member) throw new Error("Member not found");
    const { _id, ...memberData } = member;
    return {
      ...memberData,
      id: _id.toString(),
    };
  }

  async createMember(data: MemberCreateInput): Promise<Member> {
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

  async updateMember(id: string, data: MemberUpdateInput): Promise<Member> {
    const collection = await this.getCollection();
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );
    if (!result) throw new Error("Member not found");
    const { _id, ...memberData } = result;
    return {
      ...memberData,
      id: _id.toString(),
    };
  }

  async deleteMember(id: string): Promise<void> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw new Error("Member not found");
  }
} 