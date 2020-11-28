import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismicClient } from '../../lib/prismic';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const ref = req.query.token;

  // Check the token parameter against the Prismic SDK
  const url = await PrismicClient.previewSession(ref as string, doc => doc.uid, '/');

  if (!url) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    ref, // pass the ref to pages so that they can fetch the draft ref
  });

  res.redirect(url);
};
