import {useEffect, useState} from "react";
import { BarLoader } from 'react-spinners'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Filter, Link2, MousePointerClick, TrendingUp, Sparkles} from "lucide-react";
import {Input} from "@/components/ui/input";

// import {CreateLink} from "@/components/create-link";
import {CreateLink} from "@/components/create-link";
 import LinkCard from "@/components/link-card";
 import Error from "@/components/error";


import {UrlState} from "@/context";
import useFetch from "@/hooks/use-fetch";
import {getUrls} from "@/db/apiUrls";
import {getClicksForUrls} from "@/db/apiClicks";


const Dashboard = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const {user} = UrlState();
  const {loading, error, data: urls, fn: fnUrls} = useFetch(getUrls, user.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  // Calculate click rate
  const clickRate = urls?.length > 0 ? ((clicks?.length || 0) / urls.length).toFixed(1) : 0;

  return (
    <div className="flex flex-col gap-8 py-8">
      {/* Loading Bar */}
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#a855f7" />
      )}

      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Welcome back! 👋
          </h1>
          <p className="text-gray-400 mt-2">Here's what's happening with your links</p>
        </div>
        <div className="hidden sm:block">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full px-6 py-3">
            <span className="text-purple-400 font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Premium Account
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-300">Links Created</CardTitle>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Link2 className="w-5 h-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">{urls?.length || 0}</div>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Total short links
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-300">Total Clicks</CardTitle>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <MousePointerClick className="w-5 h-5 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">{clicks?.length || 0}</div>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              All-time clicks
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-600/10 to-red-600/10 border-pink-500/30 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-300">Click Rate</CardTitle>
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-pink-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">{clickRate}</div>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Clicks per link
            </p>
          </CardContent>
        </Card>
      </div>

      {/* My Links Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 bg-gray-800/30 p-6 rounded-2xl border border-gray-700">
        <div>
          <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Link2 className="w-8 h-8 text-purple-400" />
            My Links
          </h2>
          <p className="text-gray-400 mt-1 text-sm">
            {filteredUrls?.length || 0} {filteredUrls?.length === 1 ? 'link' : 'links'} found
          </p>
        </div>
        <CreateLink />
      </div>

      {/* Filter Input */}
      <div className="relative">
        <Input
          type="text"
          placeholder="🔍 Search links by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-14 pr-12 bg-gray-800/50 border-gray-700 focus:border-purple-500 rounded-xl text-white placeholder:text-gray-500 transition-all duration-300"
        />
        <Filter className="absolute top-4 right-4 w-6 h-6 text-gray-500" />
      </div>

      {error && <Error message={error?.message} />}
      
      {/* Links Grid */}
      <div className="flex flex-col gap-4">
        {(filteredUrls || []).map((url, i) => (
          <div 
            key={i}
            className="transform transition-all duration-300 hover:scale-[1.02]"
          >
            <LinkCard url={url} fetchUrls={fnUrls} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredUrls && filteredUrls.length === 0 && !loading && (
        <div className="text-center py-20 bg-gray-800/30 rounded-2xl border border-gray-700 border-dashed">
          <div className="inline-block p-6 bg-gray-800/50 rounded-full mb-4">
            <Link2 className="w-16 h-16 text-gray-600" />
          </div>
          <p className="text-2xl font-bold text-gray-300 mb-2">No links found</p>
          <p className="text-gray-500 mb-6">
            {searchQuery 
              ? "Try a different search term" 
              : "Create your first short link to get started!"}
          </p>
          {!searchQuery && <CreateLink />}
        </div>
      )}
    </div>
  );
}

export default Dashboard;