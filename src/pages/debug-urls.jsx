import { useEffect, useState } from "react";
import supabase from "@/db/supabase";

const DebugUrls = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUrls = async () => {
      const { data, error } = await supabase
        .from("urls")
        .select("id, title, short_url, custom_url, original_url")
        .limit(10);
      
      console.log("All URLs:", data);
      if (error) {
        console.error("Error:", error);
      } else {
        setUrls(data || []);
      }
      setLoading(false);
    };

    fetchAllUrls();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug: All URLs in Database</h1>
      <div className="space-y-4">
        {urls.map((url) => (
          <div key={url.id} className="border p-4 rounded">
            <p><strong>Title:</strong> {url.title}</p>
            <p><strong>Short URL:</strong> {url.short_url}</p>
            <p><strong>Custom URL:</strong> {url.custom_url || "None"}</p>
            <p><strong>Original URL:</strong> {url.original_url}</p>
            <p className="text-sm text-blue-400 mt-2">
              Test: <a href={`/${url.short_url}`} className="underline">/{url.short_url}</a>
              {url.custom_url && (
                <> | <a href={`/${url.custom_url}`} className="underline">/{url.custom_url}</a></>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugUrls;
