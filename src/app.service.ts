import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {


  findAll() {
    return `This action returns all app`;
  }

  findOne(id: number) {
    return `This action returns a #${id} app`;
  }



  remove(id: number) {
    return `This action removes a #${id} app`;
  }
}
