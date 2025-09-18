const fetchSupabase = async ({ query, cache = "force-cache" }) => {
  return fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + "/rest/v1/" + query, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    cache,
  });
};
