import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class JournalService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  async create(data: any) {
    const { error } = await this.supabase
      .from('journal_entries')
      .insert([data]);

    if (error) throw new Error(error.message);
    return { message: 'Entry created successfully' };
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  async delete(id: string) {
    const { error } = await this.supabase
      .from('journal_entries')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return { message: 'Entry deleted' };
  }
}