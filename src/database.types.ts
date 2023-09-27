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
          assists: string | null
          card: string | null
          created_at: string
          goals: string | null
          lineup_id: string
          match_id: string
          match_rating: string | null
          payment_status: string
          player_id: string
          player_name: string
          player_position: string
          player_rating: string
          team_id: string
        }
        Insert: {
          assists?: string | null
          card?: string | null
          created_at?: string
          goals?: string | null
          lineup_id?: string
          match_id: string
          match_rating?: string | null
          payment_status?: string
          player_id?: string
          player_name: string
          player_position: string
          player_rating: string
          team_id: string
        }
        Update: {
          assists?: string | null
          card?: string | null
          created_at?: string
          goals?: string | null
          lineup_id?: string
          match_id?: string
          match_rating?: string | null
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
      match_official: {
        Row: {
          created_at: string
          id: string
          location: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          location: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string
          name?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          best_player: string | null
          created_at: string
          date: string
          format: string
          location: string
          match_id: string
          match_official: string | null
          match_status: string | null
          opponent_corner: string | null
          opponent_discipline: string | null
          opponent_id: string | null
          opponent_match_rating: string | null
          opponent_name: string | null
          opponent_rating: string | null
          opponent_red_card: string | null
          opponent_score: string | null
          opponent_status: string
          opponent_yellow_card: string | null
          team_corner: string | null
          team_discipline: string | null
          team_id: string
          team_match_rating: string | null
          team_name: string
          team_rating: string
          team_red_card: string | null
          team_score: string | null
          team_yellow_card: string | null
          time: string
        }
        Insert: {
          best_player?: string | null
          created_at?: string
          date: string
          format: string
          location: string
          match_id?: string
          match_official?: string | null
          match_status?: string | null
          opponent_corner?: string | null
          opponent_discipline?: string | null
          opponent_id?: string | null
          opponent_match_rating?: string | null
          opponent_name?: string | null
          opponent_rating?: string | null
          opponent_red_card?: string | null
          opponent_score?: string | null
          opponent_status?: string
          opponent_yellow_card?: string | null
          team_corner?: string | null
          team_discipline?: string | null
          team_id: string
          team_match_rating?: string | null
          team_name: string
          team_rating: string
          team_red_card?: string | null
          team_score?: string | null
          team_yellow_card?: string | null
          time: string
        }
        Update: {
          best_player?: string | null
          created_at?: string
          date?: string
          format?: string
          location?: string
          match_id?: string
          match_official?: string | null
          match_status?: string | null
          opponent_corner?: string | null
          opponent_discipline?: string | null
          opponent_id?: string | null
          opponent_match_rating?: string | null
          opponent_name?: string | null
          opponent_rating?: string | null
          opponent_red_card?: string | null
          opponent_score?: string | null
          opponent_status?: string
          opponent_yellow_card?: string | null
          team_corner?: string | null
          team_discipline?: string | null
          team_id?: string
          team_match_rating?: string | null
          team_name?: string
          team_rating?: string
          team_red_card?: string | null
          team_score?: string | null
          team_yellow_card?: string | null
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
      tournaments: {
        Row: {
          category: string
          created_at: string
          format: string
          id: string
          location: string
          name: string
          prize_money: string | null
          start_date: string
          type: string
        }
        Insert: {
          category: string
          created_at?: string
          format: string
          id?: string
          location: string
          name: string
          prize_money?: string | null
          start_date: string
          type: string
        }
        Update: {
          category?: string
          created_at?: string
          format?: string
          id?: string
          location?: string
          name?: string
          prize_money?: string | null
          start_date?: string
          type?: string
        }
        Relationships: []
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
