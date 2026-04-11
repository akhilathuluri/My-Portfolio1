export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      portfolio_sections: {
        Row: {
          section_key: string;
          content: Json;
          updated_at: string;
        };
        Insert: {
          section_key: string;
          content: Json;
          updated_at?: string;
        };
        Update: {
          section_key?: string;
          content?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
