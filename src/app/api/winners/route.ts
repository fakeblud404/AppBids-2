import { NextResponse } from 'next/server';

const DEMO_WINNERS = [
  { id: '1', name: 'Jessica M.', avatarEmoji: '👩‍💻', itemWon: 'iPhone 15 Pro Max', amountPaid: 124900, date: new Date(Date.now() - 2 * 3600 * 1000), category: 'Electronics', biggestPlinkoWin: 5 },
  { id: '2', name: 'Michael S.', avatarEmoji: '👨‍🎨', itemWon: 'MacBook Air M3', amountPaid: 149900, date: new Date(Date.now() - 6 * 3600 * 1000), category: 'Computers', biggestPlinkoWin: 3.4 },
  { id: '3', name: 'Sarah K.', avatarEmoji: '👩‍🔧', itemWon: 'Sony WH-1000XM5', amountPaid: 39900, date: new Date(Date.now() - 24 * 3600 * 1000), category: 'Audio', biggestPlinkoWin: 2 },
  { id: '4', name: 'David R.', avatarEmoji: '👨‍💼', itemWon: 'iPad Pro M4', amountPaid: 109900, date: new Date(Date.now() - 48 * 3600 * 1000), category: 'Tablets', biggestPlinkoWin: 10 },
  { id: '5', name: 'Emily T.', avatarEmoji: '👩‍🚀', itemWon: 'Samsung Galaxy S24', amountPaid: 89900, date: new Date(Date.now() - 72 * 3600 * 1000), category: 'Phones', biggestPlinkoWin: 5 },
];

export async function GET() {
  // TODO: BACKEND — fetch winners from Firestore collection ('winners' or 'ads' where status == 'closed')
  return NextResponse.json({ winners: DEMO_WINNERS });
}
