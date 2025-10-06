import {UAParser} from "ua-parser-js";
import supabase from "./supabase";

// export async function getClicks() {
//   let {data, error} = await supabase.from("clicks").select("*");

//   if (error) {
//     console.error(error);
//     throw new Error("Unable to load Stats");
//   }

//   return data;
// }

export async function getClicksForUrls(urlIds) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

export async function getClicksForUrl(url_id) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
}

export const storeClicks = async ({id, originalUrl}) => {
  try {
    // Initialize parser
    const parser = new UAParser();
    const res = parser.getResult();
    const device = res.type || "desktop";

    // Get location data
    const response = await fetch("https://ipapi.co/json");
    const {city, country_name: country} = await response.json();

    // Record the click in database
    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    // Ensure the URL has a protocol
    let redirectUrl = originalUrl;
    if (!/^https?:\/\//i.test(originalUrl)) {
      redirectUrl = 'https://' + originalUrl;
    }
    
    // Redirect to the original URL
    window.location.href = redirectUrl;
  } catch (error) {
    console.error("Error recording click:", error);
    
    // Still redirect even if recording fails
    if (originalUrl) {
      let redirectUrl = originalUrl;
      if (!/^https?:\/\//i.test(originalUrl)) {
        redirectUrl = 'https://' + originalUrl;
      }
      window.location.href = redirectUrl;
    }
  }
};