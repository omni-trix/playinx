export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      lineup: {
        Row: {
          created_at: string
          lineup_id: string
          match_id: string
          payment_status: string
          player_id: string
          player_name: string
          player_position: string
          player_rating: string
          team_id: string
        }
        Insert: {
          created_at?: string
          lineup_id?: string
          match_id: string
          payment_status?: string
          player_id?: string
          player_name: string
          player_position: string
          player_rating: string
          team_id: string
        }
        Update: {
          created_at?: string
          lineup_id?: string
          match_id?: string
          payment_status?: string
          player_id?: string
          player_name?: string
          player_position?: string
          player_rating?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lineup_match_id_fkey"
            columns: ["match_id"]
            referencedRelation: "matches"
            referencedColumns: ["match_id"]
          }
        ]
      }
      matches: {
        Row: {
          created_at: string
          date: string
          format: string
          location: string
          match_id: string
          match_status: string | null
          opponent_id: string | null
          opponent_name: string | null
          opponent_status: string
          team_id: string
          team_name: string
          time: string
        }
        Insert: {
          created_at?: string
          date: string
          format: string
          location: string
          match_id?: string
          match_status?: string | null
          opponent_id?: string | null
          opponent_name?: string | null
          opponent_status?: string
          team_id: string
          team_name: string
          time: string
        }
        Update: {
          created_at?: string
          date?: string
          format?: string
          location?: string
          match_id?: string
          match_status?: string | null
          opponent_id?: string | null
          opponent_name?: string | null
          opponent_status?: string
          team_id?: string
          team_name?: string
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_opponent_id_fkey"
            columns: ["opponent_id"]
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "matches_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          }
        ]
      }
      players: {
        Row: {
          created_at: string
          player_dob: string
          player_id: string
          player_name: string
          player_phone: string
          player_position: string
          player_rating: string
          team_id: string
        }
        Insert: {
          created_at?: string
          player_dob: string
          player_id?: string
          player_name: string
          player_phone: string
          player_position: string
          player_rating: string
          team_id: string
        }
        Update: {
          created_at?: string
          player_dob?: string
          player_id?: string
          player_name?: string
          player_phone?: string
          player_position?: string
          player_rating?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          }
        ]
      }
      profiles: {
        Row: {
          dob: string
          gender: string
          name: string
          phone: string
          position: string
          rating: string
          user_id: string
        }
        Insert: {
          dob: string
          gender: string
          name: string
          phone: string
          position: string
          rating: string
          user_id?: string
        }
        Update: {
          dob?: string
          gender?: string
          name?: string
          phone?: string
          position?: string
          rating?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      teams: {
        Row: {
          format: string
          location: string
          players: string[] | null
          rating: string
          team_admin: string
          team_id: string
          team_name: string
        }
        Insert: {
          format: string
          location: string
          players?: string[] | null
          rating: string
          team_admin: string
          team_id?: string
          team_name: string
        }
        Update: {
          format?: string
          location?: string
          players?: string[] | null
          rating?: string
          team_admin?: string
          team_id?: string
          team_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_team_admin_fkey"
            columns: ["team_admin"]
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_player_to_team: {
        Args: {
          p_team_id: string
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
