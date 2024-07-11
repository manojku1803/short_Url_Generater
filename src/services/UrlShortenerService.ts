import UrlRepository from "@/repositories/UrlRepository";
import ShortUniqueId from "short-unique-id";

export class UrlShortenerServices{
    private urlRepository;
    constructor(){
        this.urlRepository = new UrlRepository();
    }

    async shortenUrl(originalUrl: string): Promise<string>{
        if(!originalUrl){
            return "";
        }
        let url = await this.urlRepository.getUrlByOriginalUrl(originalUrl);
        if(url){
            return url.shortUrl;
        }
        const uid = new ShortUniqueId({ length: 10 });

        let shortUrl = uid.rnd();
        url = await this.urlRepository.getUrlByShortUrl(shortUrl);
        while(url){
            shortUrl = uid.rnd();
            url = await this.urlRepository.getUrlByShortUrl(shortUrl);
        }
        await this.urlRepository.createUrl(originalUrl,`urls/${shortUrl}`);
        console.log(shortUrl);
        return shortUrl;
    }

    async getAllUrls(){
        return await this.urlRepository.getAllUrls();
    }

    async getUrlByShortUrl(shortUrl: string){
        return await this.urlRepository.getUrlByShortUrl(shortUrl);
    }
}