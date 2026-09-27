import type { MongoAbility } from "@casl/ability";

export type Actions =
  | "CREATE"
  | "VIEW"
  | "READ"
  | "READ_OWN"
  | "READ_ALL"
  | "UPDATE"
  | "UPDATE_OWN"
  | "UPDATE_ALL"
  | "DELETE"
  | "DELETE_OWN"
  | "DELETE_ALL"
  | "EXPORT"
  | "ASSIGN"
  | "APPROVE"
  | "APPROVE_VIEW";

export type Subjects = string;

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export interface PermissionCheck {
  action: string;
  subject: string;
}

export interface Permission {
  module: string;
  action: string;
}

export type PermissionKey = string;
