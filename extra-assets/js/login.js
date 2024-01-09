// This code must be run *as early as possible*, as we care about redirecting the user
// *somewhere* immediately. So this isn't wrapped in a window.onload or similar, but bare.
// This code is also loaded directly in <head>, so it will block page load.
const curUrl = new URL(document.location);
// if next query param is presentm just do nothing
const nextUrl = curUrl.searchParams.get('next');
// /hub/ being next should be treated same as no next present
if (!nextUrl || nextUrl === "/hub/") {
    // The 'unified' home page for all the hubs is at https://datatools.utoronto.ca,
    // so anyone landing on the home page should just be redirected.
    window.location.replace("https://datatools.utoronto.ca");
} else {
    // The user has landed on this page, which means they are not actually logged in,
    // and need to login to continue to wherever they are going. So let's construct the
    // appropriate oauth_login URL for them to go to.
    let oauthLoginUrl = new URL(document.location);
    // Pass along all url parameters we got, just change from /login to /oauth_login
    oauthLoginUrl.pathname = "/oauth_login";
    window.location.replace(oauthLoginUrl);
}
