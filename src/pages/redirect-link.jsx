import {storeClicks} from "@/db/apiClicks";
import {getLongUrl} from "@/db/apiUrls";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BarLoader} from "react-spinners";

const RedirectLink = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndRedirect = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const urlData = await getLongUrl(id);
        setData(urlData);
        
        if (urlData && urlData.original_url) {
          // Store click analytics and redirect
          await storeClicks({
            id: urlData.id,
            originalUrl: urlData.original_url,
          });
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchAndRedirect();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <BarLoader width={"100%"} color="#36d7b7" />
        <p className="mt-4 text-gray-400">Redirecting...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <h2 className="text-2xl font-bold">Error</h2>
        <p className="mt-2">{error.message || "Short URL not found"}</p>
        <p className="text-sm mt-4 text-gray-400">Looking for: {id}</p>
        <p className="text-xs mt-2 text-gray-500">
          Make sure you're using the correct short code
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-gray-300">Short URL not found</h2>
        <p className="text-gray-500 mt-2">The link you're looking for doesn't exist</p>
      </div>
    );
  }

  return null;
};

export default RedirectLink;