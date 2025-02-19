export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      menu_items: {
        Row: {
          id: number
          image: string | null
          name: string
          price: number
          restaurant_id: number | null
          restaurantId: number
        }
        Insert: {
          id?: number
          image?: string | null
          name: string
          price: number
          restaurant_id?: number | null
          restaurantId: number
        }
        Update: {
          id?: number
          image?: string | null
          name?: string
          price?: number
          restaurant_id?: number | null
          restaurantId?: number
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          banner: string | null
          city: string | null
          country: string | null
          description: string | null
          displayPicture: string
          id: string
          name: string
          profile_id: number
          province: string | null
        }
        Insert: {
          banner?: string | null
          city?: string | null
          country?: string | null
          description?: string | null
          displayPicture?: string
          id: string
          name: string
          profile_id?: number
          province?: string | null
        }
        Update: {
          banner?: string | null
          city?: string | null
          country?: string | null
          description?: string | null
          displayPicture?: string
          id?: string
          name?: string
          profile_id?: number
          province?: string | null
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          banner: string | null
          closingTime: string
          description: string
          id: number
          location: string
          logo: string | null
          name: string
          openingTime: string
          owner_id: string | null
          price_range: string | null
          rating: number
          review_count: number
          tags: string[] | null
        }
        Insert: {
          banner?: string | null
          closingTime: string
          description: string
          id?: number
          location: string
          logo?: string | null
          name: string
          openingTime: string
          owner_id?: string | null
          price_range?: string | null
          rating?: number
          review_count: number
          tags?: string[] | null
        }
        Update: {
          banner?: string | null
          closingTime?: string
          description?: string
          id?: number
          location?: string
          logo?: string | null
          name?: string
          openingTime?: string
          owner_id?: string | null
          price_range?: string | null
          rating?: number
          review_count?: number
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          body: string
          comments: number[] | null
          downvotes: number
          id: number
          images: string[] | null
          isDeleted: boolean
          isEdited: boolean
          isReply: boolean | null
          ownerResponded: boolean | null
          rating: number
          restaurantId: number
          title: string
          upvotes: number
          userId: number
          videos: string[] | null
        }
        Insert: {
          body: string
          comments?: number[] | null
          downvotes?: number
          id?: number
          images?: string[] | null
          isDeleted?: boolean
          isEdited?: boolean
          isReply?: boolean | null
          ownerResponded?: boolean | null
          rating: number
          restaurantId: number
          title: string
          upvotes?: number
          userId: number
          videos?: string[] | null
        }
        Update: {
          body?: string
          comments?: number[] | null
          downvotes?: number
          id?: number
          images?: string[] | null
          isDeleted?: boolean
          isEdited?: boolean
          isReply?: boolean | null
          ownerResponded?: boolean | null
          rating?: number
          restaurantId?: number
          title?: string
          upvotes?: number
          userId?: number
          videos?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_restaurantId_fkey"
            columns: ["restaurantId"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_downvotes: {
        Row: {
          restaurant_id: number
          review_id: number
          user_id: string
        }
        Insert: {
          restaurant_id: number
          review_id: number
          user_id: string
        }
        Update: {
          restaurant_id?: number
          review_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_downvotes_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_downvotes_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_downvotes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_upvotes: {
        Row: {
          restaurant_id: number
          review_id: number
          user_id: string
        }
        Insert: {
          restaurant_id: number
          review_id: number
          user_id: string
        }
        Update: {
          restaurant_id?: number
          review_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_upvotes_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_upvotes_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_upvotes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      downvote: {
        Args: {
          user_id: string
          restaurant_id: number
          review_id: number
        }
        Returns: undefined
      }
      get_review_downvote_counts: {
        Args: {
          review_id_param: number
        }
        Returns: {
          review_id: number
          count: number
        }[]
      }
      get_review_upvote_counts: {
        Args: {
          review_id_param: number
        }
        Returns: {
          review_id: number
          count: number
        }[]
      }
      upvote: {
        Args: {
          user_id: string
          restaurant_id: number
          review_id: number
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
