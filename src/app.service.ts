import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { EMPTY, expand, reduce } from 'rxjs';

@Injectable()
export class AppService {
  private authToken: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.authToken = this.configService.get('API_KEY');
  }

  async getAllPeople(pageNum = 1) {
    return this.httpService
      .get(`https://api.salesloft.com/v2/people.json?page=${pageNum}`, {
        headers: { Authorization: `Bearer ${this.authToken}` },
      })
      .pipe(
        expand((res: any) =>
          res.data.metadata.paging.next_page
            ? this.httpService.get(
                `https://api.salesloft.com/v2/people.json?page=${res.data.metadata.paging.next_page}`,
                {
                  headers: { Authorization: `Bearer ${this.authToken}` },
                },
              )
            : EMPTY,
        ),
        reduce((acc, res) => acc.concat(res.data), []),
      );
  }
}
