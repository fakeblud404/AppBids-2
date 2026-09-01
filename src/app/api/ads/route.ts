import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// In-memory fallback database for mock local sandbox demo
let MEMO_ADS_STORE: any[] = [];

// GET /api/ads — Fetch leaderboard sorted by finalBid desc
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');

    let ads: any[] = [];
    try {
      let query = adminDb
        .collection('ads')
        .where('status', '==', 'active')
        .orderBy('finalBid', 'desc')
        .limit(limit);

      if (category && category !== 'All') {
        query = adminDb
          .collection('ads')
          .where('status', '==', 'active')
          .where('category', '==', category)
          .orderBy('finalBid', 'desc')
          .limit(limit);
      }

      const snapshot = await query.get();
      ads = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
      }));
    } catch (dbError) {
      console.warn('Firestore not initialized or failed, using local in-memory store:', dbError);
      ads = [...MEMO_ADS_STORE];
      if (category && category !== 'All') {
        ads = ads.filter((ad) => ad.category === category);
      }
      ads.sort((a, b) => b.finalBid - a.finalBid);
      ads = ads.slice(0, limit);
    }

    return NextResponse.json({ ads });
  } catch (error) {
    console.error('Error fetching ads:', error);
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
  }
}

// POST /api/ads — Submit new ad after payment + Plinko
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, url, category, baseBid, multiplier, finalBid, stripePaymentId } = body;

    if (!title || !url || !baseBid || !multiplier || !stripePaymentId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const now = new Date();
    const adData = {
      title,
      description: description || '',
      url,
      category: category || 'Other',
      baseBid,
      multiplier,
      finalBid: finalBid || Math.round(baseBid * multiplier),
      clicks: 0,
      status: 'active', // Auto-approve
      stripePaymentId,
      createdAt: now,
      updatedAt: now,
    };

    let docId = 'demo-' + Math.random().toString(36).substr(2, 9);
    try {
      const docRef = await adminDb.collection('ads').add(adData);
      docId = docRef.id;
    } catch (dbError) {
      console.warn('Firestore writing failed, appending to local in-memory store:', dbError);
      MEMO_ADS_STORE.push({ id: docId, ...adData });
    }

    return NextResponse.json({
      id: docId,
      ...adData,
    });
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json({ error: 'Failed to create ad' }, { status: 500 });
  }
}
