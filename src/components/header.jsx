import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, LinkIcon } from "lucide-react";
import {UrlState} from "@/context";
import useFetch from "@/hooks/use-fetch";
import {logout} from "@/db/apiAuth";


const Header = () => {
  const {loading, fn: fnLogout} = useFetch(logout);
  const navigate = useNavigate();

  const {user, fetchUser} = UrlState();

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img 
            src="/Shortiffy.png" 
            className="h-28" 
            alt="Shortiffy Logo"
          />
        </Link>
        <div className="flex gap-4 items-center">
          {!user ? (
            <Button 
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
            >
              Login
            </Button>
          ) : (
            <>
              <Button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
              >
                <LinkIcon className="w-4 h-4" />
                My Links
              </Button>
              <Button
                onClick={() => {
                  fnLogout().then(() => {
                    fetchUser();
                    navigate("/auth");
                  });
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
              <Avatar className="w-10 h-10 border-2 border-purple-500 cursor-pointer hover:border-pink-500 transition-all duration-300 hover:scale-110 shadow-lg">
                <AvatarImage src={user?.user_metadata?.profile_pic} />
                <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold">
                  {user?.user_metadata?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;