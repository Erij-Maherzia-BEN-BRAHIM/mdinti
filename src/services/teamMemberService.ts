import { ObjectId } from 'mongodb';
import { TeamMember, TeamMemberCreateInput, TeamMemberUpdateInput } from '@/models/TeamMember';
import clientPromise from '@/lib/db';

export class TeamMemberService {
  private async getCollection() {
    const client = await clientPromise;
    const db = client.db();
    return db.collection<Omit<TeamMember, 'id'> & { _id: ObjectId }>('team_members');
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    const collection = await this.getCollection();
    const members = await collection.find().sort({ createdAt: -1 }).toArray();
    return members.map(({ _id, ...member }) => ({
      ...member,
      id: _id.toString(),
    }));
  }

  async getTeamMember(id: string): Promise<TeamMember> {
    const collection = await this.getCollection();
    const member = await collection.findOne({ _id: new ObjectId(id) });
    if (!member) throw new Error('Team member not found');
    const { _id, ...memberData } = member;
    return {
      ...memberData,
      id: _id.toString(),
    };
  }

  async createTeamMember(data: TeamMemberCreateInput): Promise<TeamMember> {
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

  async updateTeamMember(id: string, data: TeamMemberUpdateInput): Promise<TeamMember> {
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
    if (!result) throw new Error('Team member not found');
    const { _id, ...memberData } = result;
    return {
      ...memberData,
      id: _id.toString(),
    };
  }

  async deleteTeamMember(id: string): Promise<void> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw new Error('Team member not found');
  }
} 