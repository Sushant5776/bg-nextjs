import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({message: 'method not allowed!'})
  }

  try {
    const formData = await req.formData()

    const response = await axios.post('http://localhost:8000', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'image/png'
        },
        responseType: 'arraybuffer'
    })

    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'image/png'
      }
    })
  } catch (e) {
    console.error('Error:', e);
    return NextResponse.json({ error: 'Failed to process the image' });
  }
}
