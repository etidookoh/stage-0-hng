import { BadGatewayException, BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { NameDto } from './classify.dto';
import axios from 'axios';

@Injectable()
export class AppService {
  async classifyName(name: string) {
  try {
    const response = await axios.get(
      `https://api.genderize.io?name=${name}`
    );

    const { gender, probability, count } = response.data;

    // Handle nonsense names
    if (!gender || count === 0) {
      throw new BadRequestException({
        status: 'error',
        message: 'Unable to determine gender for this name',
      });
    }

    const is_confident =
      probability >= 0.7 && count >= 100;

    return {
      status: 'success',
      data: {
        name,
        gender,
        probability,
        sample_size: count,
        is_confident,
        processed_at: new Date().toISOString(),
      },
    };
  } catch (error) {
    throw new BadRequestException({
      status: 'error',
      message: 'Failed to process request',
    });
  }
}
}