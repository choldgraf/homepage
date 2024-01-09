$(function() {
    const curUrl = new URL(document.location);
    // if next query param is presentm just do nothing
    const nextPresent = curUrl.searchParams.get('next');
    // /hub/ being next should be treated same as no next present
    // GET
	// https://jupyter.utoronto.ca/hub/oauth_login?next=/hub/
    if (!nextPresent || nextPresent === "/hub/") {
        // The 'unified' home page for all the hubs is at https://datatools.utoronto.ca,
        // so anyone landing on the home page should just be redirected.
        document.write("Redirecting you to datatools.utoronto.ca");
        window.location.replace("https://datatools.utoronto.ca");
    } else {
        // The user has landed on this page, which means they are not actually logged in,
        // and need to login to continue to wherever they are going. So let's construct the
        // appropriate oauth_login URL for them to go to.
        let oauthLoginUrl = new URL(document.location);
        oauthLoginUrl.pathname = "/oauth_login";
        window.location.replace(oauthLoginUrl);
    }

})