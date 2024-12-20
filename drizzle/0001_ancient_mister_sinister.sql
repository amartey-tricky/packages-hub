CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "account";--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "accountId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "providerId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "accessToken" text;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "refreshToken" text;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "idToken" text;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "accessTokenExpiresAt" timestamp;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "refreshTokenExpiresAt" timestamp;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "scope" text;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "createdAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "updatedAt" timestamp NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "username";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "updated_at";