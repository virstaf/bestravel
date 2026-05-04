# Performance Rationale: Batch Update vs Individual Updates

## Problem
The `modifyReservationsStatus` function currently performs an N+1 query pattern:
1. It iterates over an array of `N` reservation IDs.
2. For each ID, it calls `modifyReservationStatus`.
3. `modifyReservationStatus` creates a new Supabase admin client and executes a single `UPDATE` query.

This results in:
- `N` network requests to the Supabase API.
- `N` database transactions/statements.
- `N` client initializations.

## Solution
Refactor `modifyReservationsStatus` to use a single `UPDATE` query with the `.in('id', reservation_ids)` filter.

## Expected Benefits
- **Reduced Network Latency:** Instead of `N` round-trips, there is only 1. Network latency is often the biggest bottleneck in database operations.
- **Database Efficiency:** One `UPDATE` statement with an `IN` clause is significantly faster for the database to process than `N` individual `UPDATE` statements, as it involves less transaction overhead and query parsing.
- **Resource Usage:** Only one Supabase client is initialized.

## Measurement Difficulty
A live benchmark is impractical in this environment because:
1. It requires a live Supabase instance with a `reservations` table and valid service role keys.
2. The environment does not have these credentials configured for runtime use in benchmarks (they are expected to be in environment variables which are missing or restricted).

However, this is a well-known optimization pattern in database-driven applications (Batching).
