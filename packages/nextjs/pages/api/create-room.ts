import axios from 'axios';
 
import type { NextApiRequest, NextApiResponse } from 'next';
 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.post(
      'https://api.huddle01.com/api/v1/create-room',
      {
        title: 'Huddle01-Test',
        roomLock: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'VwTZ4AGTxme9snANex9tep3NwvVMGfYd',
        },
      }
    );
 
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
 
export default handler;