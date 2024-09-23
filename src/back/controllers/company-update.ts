import * as bcrypt from 'bcryptjs';
import { Body, Post, Request, Response, Route, Security } from 'tsoa';
import pool from '../db';
import type { IAuthRequest, ICompany } from '../types';

@Route('company-update')
export class CompanyUpdateController {
  @Response(500, 'Response with error')
  @Response(401, 'Unauthorized request response')
  @Security('Bearer', ['AuthService'])
  @Post('')
  public async update(
    @Body() request: ICompany,
    @Request() { user }: IAuthRequest,
  ): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query(
        `UPDATE companies SET 
            title = $1, 
            tin = $2, 
            login = $3, 
            email = $4, 
            currency_symbol = $5, 
            lang = $6, 
            langs = $7, 
            address = $8, 
            instagram = $9, 
            google_maps_link = $10, 
            phone = $11, 
            pm = $12
        WHERE id = $13`,
        [
          request.title,
          request.tin,
          request.login,
          request.email,
          request.currency_symbol,
          request.lang,
          JSON.stringify(request.langs),
          request.address,
          request.instagram,
          request.google_maps_link,
          request.phone,
          JSON.stringify(request.pm),
          user.companyId,
        ],
      );

      if (!!request.password) {
        const newPassword = await bcrypt.hash(request.password, 13);
        await client.query(
          `UPDATE users SET 
              password = $1
          WHERE id = $2`,
          [newPassword, user.id],
        );
      }
    } finally {
      client.release();
    }
  }
}
