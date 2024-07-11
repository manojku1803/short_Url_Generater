import { UrlShortenerServices } from "@/services/UrlShortenerService";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const {originalUrl} =  await req.json();

    const shortenerService = new UrlShortenerServices();
    const shortUrl = await shortenerService.shortenUrl(originalUrl);
    return NextResponse.json({shortUrl},{status:201});
}
