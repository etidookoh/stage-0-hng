import { BadGatewayException, BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { NameDto } from './classify.dto';

@Injectable()
export class AppService {
  async getHello(dto: NameDto) {
    if (!dto.name) throw new BadRequestException('Please provide name');

    const url = `https://api.genderize.io?name=${dto.name}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new BadRequestException('External service unreachable');
      }

      const data = await response.json();

      const gender = data.gender;
      const probability = Number(data.probability);
      const sample_size = Number(data.count);

      if (!gender || sample_size === 0) {
        throw new BadRequestException('No prediction available');
      }

      const is_confident = probability >= 0.7 && sample_size >= 100;

      return {
        status: 'successful',
        data: {
          name: data.name,
          gender,
          probability,
          sample_size,
          is_confident,
          processed_at: new Date().toISOString(),
        },
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      console.error('Error:', error);
      throw new BadGatewayException('Unable to continue with your request');
    }
  }
}