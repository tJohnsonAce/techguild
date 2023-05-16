import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    let { userId } = req.body; // First, try to get userId from the body

    if (!userId) { // If userId is not present in the body, try to get it from the query
      userId = req.query.userId;
    }

    const { currentUser } = await serverAuth(req, res);

    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID is not valid');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])];

    if (req.method === 'POST') {
      if (!updatedFollowingIds.includes(userId)) {
        updatedFollowingIds.push(userId);
      }
    }

    if (req.method === 'DELETE') {
      updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        followingIds: updatedFollowingIds
      }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
